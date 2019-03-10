import React from 'react'
import { Container } from 'reactstrap'

import Button from './Button'

import createFakeSensorMeasurements from '../apis/createFakeSensorMeasurements'
import deleteAllMeasurements from '../apis/deleteAllMeasurements'

const Footer = () => {
  return (
    <footer>
      <Container>
        <Button onClick={createFakeSensorMeasurements}>
          Datenbank mit randomisierten Daten füllen
        </Button>
        <Button onClick={deleteAllMeasurements}>Datenbank löschen</Button>
      </Container>
    </footer>
  )
}

export default Footer
