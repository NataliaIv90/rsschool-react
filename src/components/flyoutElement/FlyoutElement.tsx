import React from 'react';
import { useSelector } from 'react-redux';

import { useHandleDownload, useHandleClearAll } from '@/shared/hooks';

import { Button } from '@/shared/components';
import { RootState } from '@/redux/store';

export const FlyoutElement: React.FunctionComponent = (): React.JSX.Element => {
  const selectedItems = useSelector(
    (state: RootState) => state.selectedItemDetails.items
  );

  const selectedItemsLength = selectedItems
    ? Object.keys(selectedItems).length
    : 0;

  const handleDownload = useHandleDownload();

  const handleClearAll = useHandleClearAll();
  if (!selectedItemsLength) {
    return <></>;
  }
  console.log(selectedItemsLength);
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
