import { UserInfoType } from '@/types/user';
import { atom } from 'jotai';
export const userDataAtom = atom<UserInfoType>({
  socialName: '',
  nickname: '',
  currentPoint: 0,
  accumulationPoint: 0,
  description: '',
  image: '',
  legend: {
    likeCount: 0,
  },
  characterLocker: [
    {
      character: {
        image: '',
      },
    },
  ],
  userAchievement: [
    {
      achievement: {
        title: '',
        level: '',
      },
    },
  ],
});
export const characterImage = atom<string>('');
export const userCharacterChangeAtom = atom<boolean>(true);
export const userShoppingAtom = atom('');
export const achievementColorAtom = atom<'one' | 'two' | 'three' | null>(null);
export const isMyPageMenuModalAtom = atom<boolean>(false);
export const isLogoutModalAtom = atom(false);
export const isAlarmModalAtom = atom(false);
export const deleteAlarmAtom = atom<any>(null);
export const isLikeModalAtom = atom(false);
