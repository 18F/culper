import React from 'react'
import { mount } from 'enzyme'
import Suggestions from './Suggestions'

describe('The suggestions component', () => {
  const renderSuggestion = (suggestion) => {
    return (<span>suggestion</span>)
  }

  it('does not display suggestions if none are given', () => {
    const expected = {
      renderSuggestion: renderSuggestion,
      suggestions: [],
      withSuggestions: 'true',
      suggestionTitle: 'Suggestion title',
      suggestionParagraph: 'Suggestion paragraph',
      suggestionLabel: 'Suggestion label',
      suggestionDismissLabel: 'Dismiss',
      suggestionUseLabel: 'Use'
    }
    const component = mount(<Suggestions {...expected} />)
    expect(component.find('.modal').length).toEqual(0)
  })

  it('does not display suggestions if withSuggestions is not provided', () => {
    const expected = {
      renderSuggestion: renderSuggestion,
      suggestions: ['suggestion1', 'suggestion2'],
      suggestionTitle: 'Suggestion title',
      suggestionParagraph: 'Suggestion paragraph',
      suggestionLabel: 'Suggestion label',
      suggestionDismissLabel: 'Dismiss',
      suggestionUseLabel: 'Use'
    }
    const component = mount(<Suggestions {...expected} />)
    expect(component.find('.modal').length).toEqual(0)
  })

  it('displays suggestions', () => {
    const expected = {
      renderSuggestion: renderSuggestion,
      show: true,
      suggestions: ['suggestion1', 'suggestion2'],
      withSuggestions: 'true',
      suggestionTitle: 'Suggestion title',
      suggestionParagraph: 'Suggestion paragraph',
      suggestionLabel: 'Suggestion label',
      suggestionDismissLabel: 'Dismiss',
      suggestionUseLabel: 'Use'
    }
    const component = mount(<Suggestions {...expected} />)
    expect(component.find('.modal').length).toEqual(1)
  })

  it('can dismiss', () => {
    let dismissed = false
    const expected = {
      renderSuggestion: renderSuggestion,
      onDismiss: () => { dismissed = true },
      show: true,
      suggestions: ['suggestion1', 'suggestion2'],
      withSuggestions: 'true',
      suggestionTitle: 'Suggestion title',
      suggestionParagraph: 'Suggestion paragraph',
      suggestionLabel: 'Suggestion label',
      suggestionDismissLabel: 'Dismiss',
      suggestionUseLabel: 'Use'
    }
    const component = mount(<Suggestions {...expected} />)
    expect(component.find('.modal').length).toEqual(1)
    component.find('.dismiss a').simulate('click')
    expect(dismissed).toBe(true)
  })

  it('can use alternate dismiss', () => {
    let dismissed = false
    const expected = {
      renderSuggestion: renderSuggestion,
      onDismiss: () => { dismissed = true },
      show: true,
      suggestions: ['suggestion1', 'suggestion2'],
      withSuggestions: 'true',
      suggestionTitle: 'Suggestion title',
      suggestionParagraph: 'Suggestion paragraph',
      suggestionLabel: 'Suggestion label',
      suggestionDismissLabel: 'Dismiss',
      suggestionDismissAlternate: 'Another dismiss',
      suggestionUseLabel: 'Use'
    }
    const component = mount(<Suggestions {...expected} />)
    expect(component.find('.modal').length).toEqual(1)
    component.find('.dismiss a.right').simulate('click')
    expect(dismissed).toBe(true)
  })

  it('can use suggestion', () => {
    let used = false
    const expected = {
      renderSuggestion: renderSuggestion,
      onSuggestion: () => { used = true },
      show: true,
      suggestions: ['suggestion1', 'suggestion2'],
      withSuggestions: 'true',
      suggestionTitle: 'Suggestion title',
      suggestionParagraph: 'Suggestion paragraph',
      suggestionLabel: 'Suggestion label',
      suggestionDismissLabel: 'Dismiss',
      suggestionUseLabel: 'Use'
    }
    const component = mount(<Suggestions {...expected} />)
    expect(component.find('.modal').length).toEqual(1)
    component.find('.suggestion .action button').first().simulate('click')
    expect(used).toBe(true)
  })

  it('handles defaults', () => {
    expect(Suggestions.defaultProps.renderSuggestion()).toEqual(undefined)
    expect(Suggestions.defaultProps.onSuggestion()).toEqual(undefined)
    expect(Suggestions.defaultProps.onDismiss()).toEqual(undefined)
  })
})
