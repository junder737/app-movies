import * as React from 'react';
import { Dialog, Portal, Text } from 'react-native-paper';

const ModalFavorite = (statusModal) => {
  const [visible, setVisible] = React.useState(false);

  const hideDialog = () => setVisible(false);

  return (
    <Portal>
      <Dialog visible={statusModal} onDismiss={hideDialog}>
        <Dialog.Content>
          <Text variant="bodyMedium">This is simple dialog</Text>
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

export default ModalFavorite;