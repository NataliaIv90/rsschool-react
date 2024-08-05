'use client';

import React from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

import { EContextValue } from '@/types/types';
import { useTheme } from '@/shared/context';

import { Button, Loader } from '@/shared/components';
import { FlyoutElement } from '../flyoutElement';

interface PageWrapperProps {
  children: React.ReactNode;
}

export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  const isLoading = useSelector((state: RootState) => state.loader.isLoading);
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <Button
        classNames="theme-btn"
        onClick={toggleTheme}
        text={theme === EContextValue.LIGHT ? '🌞' : '🌙'}
      />
      {isLoading ? <Loader /> : null}
      <main className="main">{children}</main>
      <FlyoutElement />
    </>
  );
};
