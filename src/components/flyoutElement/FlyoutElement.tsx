import React from 'react';
import { Button } from '../../shared/components/button/Button';
import { useHandleDownload } from '../../shared/hooks/useHandleDownload';
import { useHandleClearAll } from '../../shared/hooks/useHandleClearAllSelectedItems';
import { useGetSelectedItemsNumber } from '../../shared/hooks/useGetSelectedItemsLength';

export const FlyoutElement: React.FunctionComponent = (): React.JSX.Element => {
  const selectedItemsLength = useGetSelectedItemsNumber();

  const handleDownload = useHandleDownload();
  const handleClearAll = useHandleClearAll();
  if (!selectedItemsLength) {
    return <></>;
  }

  return (
    <section className="flyout-element">
      <p className="flyout-element__text">
        {selectedItemsLength} items are selected
      </p>
      <Button text="Unselect All" onClick={handleClearAll} />
      <Button text="Download" onClick={handleDownload} />
    </section>
  );
};
