import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from '@mui/lab';

export default function UserGuide() {
  const activities = [
    {
      time: '1',
      color: 'primary.main',
      text: 'เลือกวงเงินที่ต้องการกู้',
    },
    {
      time: '2',
      color: 'secondary.main',
      text: 'กรอกข้อมูลการเงิน',
    },
    {
      time: '3',
      color: 'warning.main',
      text: 'เลือกสินเชื่อที่สนใจ',
    },
    {
      time: '4',
      color: 'error.main',
      text: 'ตรวจสอบคุณสมบัติเพิ่มเติม',
    },
    {
      time: '5',
      color: 'success.main',
      text: 'ติดต่อธนาคารออมสินสาขาที่สะดวก',
    },
  ];

  return (
    <Card
      sx={{
        direction: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Typography variant="h5" fontWeight="600" textAlign="left">
        เพียง 5 ขั้นตอน
      </Typography>
      <CardContent>
        <Timeline
          sx={{
            p: 0,
            mb: 0,
            mt: 0,
          }}
        >
          {activities.map((activity) => (
            <TimelineItem
              key={activity.time}
              sx={{
                minHeight: '57px',
              }}
            >
              <TimelineOppositeContent
                sx={{
                  flex: '0',
                }}
              >
                <Typography variant="subtitle2" fontWeight="700">
                  {activity.time}
                </Typography>
              </TimelineOppositeContent>
              <TimelineSeparator>
                <TimelineDot
                  variant="outlined"
                  sx={{
                    borderColor: activity.color,
                  }}
                />
                <TimelineConnector />
              </TimelineSeparator>
              <TimelineContent color="text.secondary" variant="h6">
                {activity.text}
              </TimelineContent>
            </TimelineItem>
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
