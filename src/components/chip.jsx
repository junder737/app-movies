import React from 'react'
import { Chip } from 'react-native-paper';

const TagType = ({data,icon, style}) => (
  <Chip style={style} icon={icon} >{data}</Chip>
);

export default TagType;