const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();
const helperService = require("./helper.service");
const ldapjs = require("ldapjs");

function AdService() {
  function authenticateAd(req, res) {
    const { username, password } = req.body;

    // Replace these values with your actual Active Directory server information
    const ldapConfig = {
      url: process.env.AD_URL,
      bindDN: process.env.AD_DOMAIN + "\\" + username, // Bind DN for authenticating to AD
      bindCredentials: password, // Password for authenticating to AD
    };

    const ldapClient = ldapjs.createClient({
      url: ldapConfig.url,
    });

    ldapClient.bind(
      ldapConfig.bindDN,
      ldapConfig.bindCredentials,
      (bindErr) => {
        if (bindErr) {
          console.error("LDAP bind error:", bindErr);
          ldapClient.unbind();
          return res
            .status(200)
            .json(
              helperService.responseResult(
                "error",
                "LDAP bind error:" + bindErr,
                0,
                []
              )
            );
        }

        const searchOptions = {
          filter: `(&(objectClass=*)(cn=${username}))`, // Adjust the filter based on your LDAP schema
          scope: "sub",
          attributes: [
            "employeeID",
            "employeeType",
            "displayname",
            "mail",
            "title",
            "department",
            "streetAddress",
            "division",
            "otherPager",
            "postalCode",
          ], // Specify the attributes you want to retrieve
        };

        ldapClient.search(
          process.env.BASE_DN,
          searchOptions,
          (searchErr, searchRes) => {
            if (searchErr) {
              console.error("Find Unser error:", searchErr);
              ldapClient.unbind();
              return res
                .status(200)
                .json(
                  helperService.responseResult(
                    "error",
                    "Find Unser error:" + searchErr,
                    0,
                    []
                  )
                );
            }

            searchRes.on("searchEntry", (entry) => {
              console.log("User found: ", entry.pojo);
              let user = {};
              let i = 0;
              while (i < entry.pojo.attributes.length) {
                if (entry.pojo.attributes[i].type === "title") {
                  user.title = entry.pojo.attributes[i].values[0];
                } else if (entry.pojo.attributes[i].type === "postalCode") {
                  user.postalCode = entry.pojo.attributes[i].values[0];
                } else if (entry.pojo.attributes[i].type === "displayName") {
                  user.displayName = entry.pojo.attributes[i].values[0];
                } else if (entry.pojo.attributes[i].type === "otherPager") {
                  user.otherPager = entry.pojo.attributes[i].values[0];
                } else if (entry.pojo.attributes[i].type === "department") {
                  user.department = entry.pojo.attributes[i].values[0];
                } else if (entry.pojo.attributes[i].type === "streetAddress") {
                  user.streetAddress = entry.pojo.attributes[i].values[0];
                } else if (entry.pojo.attributes[i].type === "employeeType") {
                  user.employeeType = entry.pojo.attributes[i].values[0];
                } else if (entry.pojo.attributes[i].type === "employeeID") {
                  user.employeeID = entry.pojo.attributes[i].values[0];
                } else if (entry.pojo.attributes[i].type === "division") {
                  user.division = entry.pojo.attributes[i].values[0];
                } else if (entry.pojo.attributes[i].type === "description") {
                  user.description = entry.pojo.attributes[i].values[0];
                }
                i++;
              }

              if (user) {
                const token = process.env.API_KEY;

                axios
                  .post(
                    "http://localhost/cash-api/findRoleUser",
                    {
                      username: username,
                    },
                    {
                      headers: {
                        "Content-Type": "application/json",
                        token: token,
                      },
                    }
                  )
                  .then((resultRole) => {
                    if (resultRole) {
                      console.log("Get role user : " + username);
                      user.role =
                        resultRole.data.status === "success"
                          ? resultRole.data.data
                          : [];

                      axios
                        .post(
                          "http://localhost/cash-api/findMenuUser",
                          {
                            username: username,
                          },
                          {
                            headers: {
                              "Content-Type": "application/json",
                              token: token,
                            },
                          }
                        )
                        .then((resultMenu) => {
                          if (resultMenu) {
                            console.log("Get menu user : " + username);
                            user.menuAccess =
                              resultMenu.data.status === "success"
                                ? resultMenu.data.data
                                : [];

                            axios
                              .post(
                                "http://localhost/cash-api/findUser",
                                {
                                  username: username,
                                },
                                {
                                  headers: {
                                    "Content-Type": "application/json",
                                    token: token,
                                  },
                                }
                              )
                              .then((resultInfo) => {
                                console.log(resultInfo);
                                user.info =
                                  resultInfo.data.status === "success"
                                    ? resultInfo.data.data
                                    : [];
                                user.accessToken = token;

                                return res
                                  .status(200)
                                  .json(
                                    helperService.responseResult(
                                      "success",
                                      "Authenticated",
                                      user.size,
                                      user
                                    )
                                  );
                              })
                              .catch((errInfo) => {
                                console.log(
                                  "Error get user : ",
                                  username,
                                  " message : ",
                                  errInfo.message
                                );
                                return res
                                  .status(200)
                                  .json(
                                    helperService.responseResult(
                                      "error",
                                      "Error get user : " + username,
                                      0,
                                      []
                                    )
                                  );
                              });
                          } else {
                            return res
                              .status(200)
                              .json(
                                helperService.responseResult(
                                  "error",
                                  "Error get menu user : " + username,
                                  0,
                                  []
                                )
                              );
                          }
                        })
                        .catch((errRole) => {
                          console.log(
                            "Error get menu user : ",
                            username,
                            " message : ",
                            errRole.message
                          );
                          return res
                            .status(200)
                            .json(
                              helperService.responseResult(
                                "error",
                                "Error get menu user : " + username,
                                0,
                                []
                              )
                            );
                        });
                    } else {
                      return res
                        .status(200)
                        .json(
                          helperService.responseResult(
                            "error",
                            "Error get role user : " + username,
                            0,
                            []
                          )
                        );
                    }
                  })
                  .catch((errRole) => {
                    console.log(
                      "Error get role user : ",
                      username,
                      " message : ",
                      errRole.message
                    );
                    return res
                      .status(200)
                      .json(
                        helperService.responseResult(
                          "error",
                          "Error get role user : " + username,
                          0,
                          []
                        )
                      );
                  });
              } else {
                return res
                  .status(200)
                  .json(
                    helperService.responseResult(
                      "error",
                      "User: " + username + " not found.",
                      0,
                      []
                    )
                  );
              }
            });

            searchRes.on("searchReference", (referral) => {
              console.log("Referral:", referral.uris.join());
            });

            searchRes.on("error", (err) => {
              console.error("LDAP search error:", err);
              ldapClient.unbind();
              return res
                .status(200)
                .json(
                  helperService.responseResult(
                    "error",
                    "LDAP search error:" + err,
                    0,
                    []
                  )
                );
            });

            searchRes.on("end", () => {
              console.log("LDAP search finished");
              ldapClient.unbind();
            });
          }
        );
      }
    );
  }

  function findUserAd(req, res) {
    if (!helperService.checkKey(req.headers.token)) {
      return res
        .status(401)
        .json(helperService.responseResult("error", "unauthorization", 0, []));
    }

    if (!req.body.username || !req.body.password || !req.body.findUser) {
      return res
        .status(200)
        .json(helperService.responseResult("error", "ข้อมูลไม่ถูกต้อง", 0, []));
    } else {
      // Replace these values with your actual Active Directory server information
      const ldapConfig = {
        url: process.env.AD_URL,
        bindDN: process.env.AD_DOMAIN + "\\" + req.body.username, // Bind DN for authenticating to AD
        bindCredentials: req.body.password, // Password for authenticating to AD
      };

      const ldapClient = ldapjs.createClient({
        url: ldapConfig.url,
      });

      ldapClient.bind(
        ldapConfig.bindDN,
        ldapConfig.bindCredentials,
        (bindErr) => {
          if (bindErr) {
            console.error("LDAP bind error:", bindErr);
            ldapClient.unbind();
            return res
              .status(200)
              .json(
                helperService.responseResult(
                  "error",
                  "LDAP bind error:" + bindErr,
                  0,
                  []
                )
              );
          }

          // // LDAP search options
          const searchOptions = {
            filter: `(&(objectClass=*)(cn=${req.body.findUser}))`, // Adjust the filter based on your LDAP schema
            scope: "sub", // Search scope: 'base', 'one', or 'sub'
          };

          // Perform LDAP search
          ldapClient.search(
            process.env.BASE_DN,
            searchOptions,
            (searchError, searchRes) => {
              searchRes.on("searchEntry", (entry) => {
                console.log("User found: ", entry.pojo);
                let user = {};
                let i = 0;
                while (i < entry.pojo.attributes.length) {
                  if (entry.pojo.attributes[i].type === "title") {
                    user.title = entry.pojo.attributes[i].values[0];
                  } else if (entry.pojo.attributes[i].type === "postalCode") {
                    user.postalCode = entry.pojo.attributes[i].values[0];
                  } else if (entry.pojo.attributes[i].type === "displayName") {
                    user.displayName = entry.pojo.attributes[i].values[0];
                  } else if (entry.pojo.attributes[i].type === "otherPager") {
                    user.otherPager = entry.pojo.attributes[i].values[0];
                  } else if (entry.pojo.attributes[i].type === "department") {
                    user.department = entry.pojo.attributes[i].values[0];
                  } else if (
                    entry.pojo.attributes[i].type === "streetAddress"
                  ) {
                    user.streetAddress = entry.pojo.attributes[i].values[0];
                  } else if (entry.pojo.attributes[i].type === "employeeType") {
                    user.employeeType = entry.pojo.attributes[i].values[0];
                  } else if (entry.pojo.attributes[i].type === "employeeID") {
                    user.employeeID = entry.pojo.attributes[i].values[0];
                  } else if (entry.pojo.attributes[i].type === "division") {
                    user.division = entry.pojo.attributes[i].values[0];
                  } else if (entry.pojo.attributes[i].type === "description") {
                    user.description = entry.pojo.attributes[i].values[0];
                  }
                  i++;
                }

                return res
                .status(200)
                .json(
                  helperService.responseResult(
                    "success",
                    "LDAP Found user",
                    user.length,
                    user
                  )
                );
              });

              searchRes.on("error", (error) => {
                console.error("LDAP search error:", error);
                return res
                  .status(200)
                  .json(
                    helperService.responseResult(
                      "error",
                      "LDAP search error: " + error,
                      0,
                      []
                    )
                  );
              });

              searchRes.on("end", (result) => {
                console.log("LDAP search result:", result.status);
                ldapClient.unbind(); // Close the connection
                  return res
                  .status(200)
                  .json(
                    helperService.responseResult(
                      "success",
                      "LDAP search end",
                      0,
                      []
                    )
                  );
                
              });
            }
          );
        }
      );
    }
  }
  return {
    authenticateAd,
    findUserAd,
  };
}

module.exports = AdService;
