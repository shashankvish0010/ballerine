import React, { FunctionComponent, useMemo } from 'react';
import { t } from 'i18next';
import { useAuthenticatedUserQuery } from '../../../../domains/auth/hooks/queries/useAuthenticatedUserQuery/useAuthenticatedUserQuery';
import { UserAvatar } from '../../atoms/UserAvatar/UserAvatar';

export const Welcome: FunctionComponent = () => {
  const { data: session } = useAuthenticatedUserQuery();
  username = useMemo(() => `${session?.user?.firstName}`, [session?.user?.firstName]);
  return (
    <div className={`mt-[27px] flex h-[36px] w-[441px] items-center`}>
      <UserAvatar className={`mr-2 d-6`} avatarUrl={session?.user?.avatarUrl} />
      <div className={`flex gap-x-2 text-[24px] font-semibold leading-[36px]`}>
        <span>{t('welcome.greeting', { defaultValue: 'Welcome' })}</span>
        <span>{username}</span>
      </div>
    </div>
  );
};
