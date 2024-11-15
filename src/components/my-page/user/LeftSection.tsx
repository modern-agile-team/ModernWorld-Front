import * as S from '@/components/my-page/user/style';
import CharacterInfo from './CharacterInfo';
import PointInfo from './PointInfo';
import Category from './Category';
import USER from '@/app/api/user';
import { useEffect, useState } from 'react';
import { useAtom, useAtomValue } from 'jotai';
import {
  userDataAtom,
  userCharacterChangeAtom,
  achievementColorAtom,
  userShoppingAtom,
} from '@/states/userAtoms';

export default function LeftSection() {
  const getUserNo = () => {
    if (typeof window !== undefined) {
      const userNo = Number(localStorage.getItem('userNo'));
      return userNo;
    }
  };

  const [userData, setUserData] = useAtom(userDataAtom);
  const userCharacterChange = useAtomValue(userCharacterChangeAtom);
  const achievementColor = useAtomValue(achievementColorAtom);
  const userShopping = useAtomValue(userShoppingAtom);

  const getUserInfo = async () => {
    const response = await USER.getUserInfo(getUserNo() as number);
    setUserData(response);
  };

  useEffect(() => {
    getUserInfo();
  }, [userCharacterChange, achievementColor, userShopping]);

  return (
    <>
      <S.OutLineSection width="48vh" height="82vh">
        <CharacterInfo
          achievementColor={
            achievementColor ? achievementColor : null
          }></CharacterInfo>
        <PointInfo></PointInfo>
        <Category></Category>
      </S.OutLineSection>
    </>
  );
}
