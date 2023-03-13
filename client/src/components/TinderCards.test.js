import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import TinderCards from './TinderCards.js'
import React from 'react'


test('swipe right on the first card', () => {
  const mockCards = [
    { id: 1, imgUrl: 'https://example.com/image1.jpg' },
    { id: 2, imgUrl: 'https://example.com/image2.jpg' },
    { id: 3, imgUrl: 'https://example.com/image3.jpg' }
  ]

  render(<TinderCards cards={mockCards} />)

  // Sprawdź, czy pierwsza karta jest widoczna
  const firstCard = screen.getByTestId('swipe-card-1')
  expect(firstCard).toBeInTheDocument()

  // Symuluj przeciągnięcie karty w prawo
  userEvent.drag(firstCard, { deltaX: 200, deltaY: 0 })

  // Sprawdź, czy pierwsza karta została usunięta
  expect(firstCard).not.toBeInTheDocument()

  // Sprawdź, czy druga karta jest widoczna
  const secondCard = screen.getByTestId('swipe-card-2')
  expect(secondCard).toBeInTheDocument()
})