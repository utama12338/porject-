import api from '../../services/api';
function hitCount(uuid, appno, stepname) {
  api
    .postHitCounter(uuid, appno, stepname)
    .then((result) => {
      if (result.status === 200) {
        console.info('success hit counter ' + stepname);
      } else {
        console.error("Access Denied : " + result);
      }
    })
    .catch((e) => {
      console.error("Access Denied : " + e.message);
    });
}

export default {
  hitCount
};
