import React from 'react'
import { Container, Button } from 'reactstrap'

import fillDBWithFakeMeasurements from '../apis/fillDBWithFakeMeasurements'
import resetDB from '../apis/resetDB'

const Footer = () => {
  return (
    <footer style={{ padding: '2rem 0' }}>
      <Container>
        <Button onClick={fillDBWithFakeMeasurements}>
          Datenbank mit randomisierten Daten füllen
        </Button>
        <br />
        <br />
        <Button onClick={resetDB}>Datenbank zurücksetzen</Button>
      </Container>
    </footer>
  )
}

export default Footer
