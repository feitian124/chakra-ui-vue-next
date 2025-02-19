import * as Examples from '../examples'
import { h } from 'vue'
import { CAlert, CAlertDescription, CAlertIcon, CAlertTitle } from '../src'

describe('Alert Examples', () => {
  Object.entries(Examples).map(([name, example]) => {
    it(`renders ${name} successfully`, () => {
      cy.mount(example.default)
      .then(() => {})
      .checkA11y()
    })
  })
})

it('contains the correct role', () => {
  cy.mount(Examples.BaseAlert.default)
    .then(() => {})
    .get('[role=alert]')
    .should('exist')
})

it.only('renders its children', () => {
  cy.mount(
    <CAlert data-testid="alert" variant="left-accent" status="info" mb="3">
      <CAlertIcon mr="2" />
      <CAlertTitle> Info alert </CAlertTitle>
      <CAlertDescription> Something just happened </CAlertDescription>
    </CAlert>
  )
    .get('[data-testid=alert]')
    .should('contain', 'Info alert')
    .and('contain', 'Something just happened')
    .and('descendants', 'svg')
})
