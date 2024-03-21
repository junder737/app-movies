import React from 'react'
import { Chip } from 'react-native-paper';

const TagType = ({type}) => (
  <Chip icon="information" >{type}</Chip>
);

export default TagType;