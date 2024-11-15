'use client';

import { useEffect, useState } from 'react';
import DayCheckBox from './DayCheckBox';
import * as S from './style';
import USER from '@/app/api/user';
import { UserAttendanceDataType } from '@/types/user';
import { days } from '@/utils/daysConstants';
import { EMOJIS } from '@/utils/emojiConstants';
import { IMAGE } from '@/utils/image';

export default function CheckIn() {
  const [selectedEmoji, setSelectedEmoji] = useState<number | null>(null);
  const [isCheck, setIsCheck] = useState(false);
  const [currentDate, setCurrentDate] = useState('');
  const [weekday, setWeekday] = useState(0);
  const [attendanceData, setAttendanceData] =
    useState<UserAttendanceDataType | null>(null);

  const getAttendance = async () => {
    const response = await USER.getAttendance();
    setAttendanceData(response);
  };

  const isCheckTrue = () => {
    if (
      attendanceData?.attendance &&
      attendanceData.attendance[weekday] &&
      attendanceData.attendance[weekday][0] > 0
    ) {
      setIsCheck(true);
      setSelectedEmoji(attendanceData.attendance[weekday][0] || null);
    }
  };

  const setAttendance = async () => {
    if (selectedEmoji) {
      await USER.setAttendance(selectedEmoji);
      setIsCheck(true);
    } else {
      alert('기분을 선택해주세요!');
    }
  };

  useEffect(() => {
    getAttendance();
    const today = new Date();
    const formattedDate = today.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
    });
    const weekday = today
      .toLocaleDateString('ko-KR', {
        weekday: 'long',
      })
      .substring(0, 1);
    setWeekday(days.indexOf(weekday));
    setCurrentDate(formattedDate);
  }, [isCheck]);

  useEffect(() => {
    isCheckTrue();
  }, [attendanceData]);

  return (
    <>
      <S.Background width="100%" height="100%" $backColor="#e9eff1">
        <S.Background width="90%" height="85%" $backColor="#fff">
          <S.ContentSection>
            <S.Font $fontSize="40px" color="#6C6C6C" $margin="0 3vh 0 0">
              출 석 체 크
            </S.Font>
            <img src={IMAGE.check} width={'30vw'} />
          </S.ContentSection>
          <S.ContentSection>
            {attendanceData ? (
              days.map((day, index) => {
                const attendance =
                  attendanceData.attendance && attendanceData.attendance[index]
                    ? attendanceData.attendance[index]
                    : [0, 0];
                return (
                  <DayCheckBox
                    key={index}
                    dayNo={index}
                    day={day}
                    attendance={attendance}
                    color={weekday === index ? '#FF7070' : null}
                    weekday={weekday}
                  />
                );
              })
            ) : (
              <>로딩중...</>
            )}
          </S.ContentSection>
          <S.MoodSelectorSection>
            <S.ColumnContainer $margin="0 2vw 0 0">
              <S.Font $fontSize="15px" color="#FF7070" $margin="0 0 -1vh 0">
                {selectedEmoji !== null
                  ? '오늘은 ' + EMOJIS[selectedEmoji]
                  : '오늘의 기분을 선택하세요!'}
              </S.Font>
              <S.CheckButton onClick={isCheck ? undefined : setAttendance}>
                <S.Font $margin="0 0.5vw 0 0">
                  {isCheck ? '출석완료' : '출석하기'}
                </S.Font>
                <img src={IMAGE.check} width={'12vw'} />
              </S.CheckButton>
              <S.Font $margin="2vh" color="#FF7070" $fontSize="18px">
                {currentDate}
              </S.Font>
            </S.ColumnContainer>
            <S.EmojiContainer>
              {EMOJIS.map((emoji, index) =>
                emoji ? (
                  <S.EmojiKey
                    key={index}
                    isSelected={selectedEmoji === index}
                    onClick={
                      isCheck ? undefined : () => setSelectedEmoji(index)
                    }
                    style={{ cursor: isCheck ? 'not-allowed' : 'pointer' }}>
                    {emoji}
                  </S.EmojiKey>
                ) : null,
              )}
            </S.EmojiContainer>
          </S.MoodSelectorSection>
          <S.Hr></S.Hr>
        </S.Background>
      </S.Background>
    </>
  );
}
