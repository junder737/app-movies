import * as React from 'react';
import { Dialog, Portal, Text, Divider, Card } from 'react-native-paper';
import { StyleSheet } from 'react-native';
import TagType from './chip';
const ModalFavorite = ({ modalVisible, setModalVisible, peliculaSeleccionada }) => {
  const hideDialog = () => setModalVisible(false);

  return (
    <Portal>
      <Dialog visible={modalVisible} onDismiss={hideDialog}>
        <Dialog.Title>{peliculaSeleccionada.Title}</Dialog.Title>
        <Dialog.Content>

       {
         (peliculaSeleccionada.Poster !== "N/A" && <Card.Cover source={{ uri: peliculaSeleccionada.Poster }} />)
       }
        <Text variant="bodyMedium">{peliculaSeleccionada.Plot}</Text>
            <TagType style={styles.shortChip} data={peliculaSeleccionada.Runtime} icon={"clock-outline"}></TagType>
            <TagType style={styles.shortChip} data={peliculaSeleccionada.Language} icon={"book"}> </TagType>
            <TagType style={styles.longChip} data={peliculaSeleccionada.Genre} icon={"movie"}> </TagType>
            <TagType style={styles.longChip} data={peliculaSeleccionada.Director} icon={"account"}> </TagType>
            <TagType style={styles.longChip} data={"Estreno: "+peliculaSeleccionada.Released+""} icon={"calendar"}> </TagType>
          <Divider />
         
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};


const styles = StyleSheet.create({
  shortChip: {
    marginTop: 5,
    width: '30%',
    marginBottom: 5
  },
  longChip: {
    marginTop: 5,
    width: '100%',
    marginBottom: 5
  }
})
export default ModalFavorite;
