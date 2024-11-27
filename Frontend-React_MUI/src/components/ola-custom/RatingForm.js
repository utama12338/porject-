import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Grid, Typography, Button } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CustomTextField from '../forms/custom-elements/CustomTextField';
import StyledRating from './StyledRating';
import api from '../../services/api';
import LoadingProgress from '../ola-custom/LoadingProgress';
import Validator from '../ola-custom/Validator';

export default function RatingForm() {
  const location = useLocation();
  const props = location.state;
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [comment, setComment] = useState('');
  const [checkComment, setCheckComment] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSaveVote = () => {
    setLoading(true);
    api
      .postSaveScoreRate(props.appno, score, comment)
      .then((resultVote) => {
        if (resultVote.status === 200) {
          if (props.email && props.status) {
            api
              .postSendMail(props.appno, props.email)
              .then((result) => {
                setLoading(false);
                if (result.status === 200 || result.status === 202) {
                  const data = {
                    uuid: props.uuid,
                    appno: props.appno,
                  };
                  navigate('/ola/completed', { state: data });
                } else {
                  console.error("Access Denied : " + result);
                }
              })
              .catch((e) => {
                setLoading(false);
                console.error("Access Denied : " + e.message);
              });
          } else {
            setLoading(false);
            const data = {
              uuid: props.uuid,
              appno: props.appno,
            };
            navigate('/ola/completed', { state: data });
          }
        } else {
          setLoading(false);
          console.error("Access Denied : " + resultVote);
        }
      })
      .catch((e) => {
        setLoading(false);
        console.error("Access Denied : " + e.message);
      });
  };

  return (
    <>
      <Typography fontWeight="600" variant="h4">
        กรุณาให้คะแนนความพึงพอใจต่อบริการ
      </Typography>
      <Grid container justifyContent="center" my={2}>
        <StyledRating
          name="customized-color"
          defaultValue={0}
          getLabelText={(value) => `${value} Heart${value !== 1 ? 's' : ''}`}
          precision={1}
          icon={<FavoriteIcon fontSize="large" />}
          emptyIcon={<FavoriteBorderIcon fontSize="large" />}
          onChange={(e) => setScore(e.target.value)}
        />
      </Grid>
      <CustomTextField
        id="outlined-multiline-static"
        multiline
        rows={4}
        variant="outlined"
        fullWidth
        size="small"
        placeholder="ข้อเสนอแนะเพิ่มเติม"
        color={checkComment === true ? 'error' : 'success'}
        error={checkComment}
        onChange={(e) => {
          setCheckComment(Validator.validCharator(e.target.value));
          setComment(e.target.value);
        }}
      />
      <Typography
        variant="h6"
        fontWeight="400"
        sx={{
          color: 'red',
          display: checkComment ? 'block' : 'none',
        }}
      >
        กรุณากรอกข้อเสนอแนะเพิ่มเติมให้ถูกต้อง
      </Typography>
      <Grid container spacing={1}>
        <Grid item lg={12} md={12} sm={12}>
          {loading ? <LoadingProgress /> : null}
        </Grid>
      </Grid>
      <Grid container justifyContent="center" my={2}>
        <Button
          variant="contained"
          size="small"
          color="primary"
          onClick={handleSaveVote}
          disabled={!checkComment && !loading ? false : true}
        >
          ยืนยัน
        </Button>
      </Grid>
    </>
  );
}
