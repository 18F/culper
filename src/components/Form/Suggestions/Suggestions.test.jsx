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
    const component = mount(<Suggestions {...expected}><span>Something</span></Suggestions>)
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
    const component = mount(<Suggestions {...expected}><span>Something</span></Suggestions>)
    expect(component.find('.modal').length).toEqual(0)
  })

  it('displays suggestions', () => {
    const expected = {
      renderSuggestion: renderSuggestion,
      suggestions: ['suggestion1', 'suggestion2'],
      withSuggestions: 'true',
      suggestionTitle: 'Suggestion title',
      suggestionParagraph: 'Suggestion paragraph',
      suggestionLabel: 'Suggestion label',
      suggestionDismissLabel: 'Dismiss',
      suggestionUseLabel: 'Use'
    }
    const component = mount(<Suggestions {...expected}><span>Something</span></Suggestions>)
    expect(component.find('.modal').length).toEqual(1)
  })

  it('can dismiss', () => {
    let dismissed = false
    const expected = {
      renderSuggestion: renderSuggestion,
      onDismiss: () => { dismissed = true },
      suggestions: ['suggestion1', 'suggestion2'],
      withSuggestions: 'true',
      suggestionTitle: 'Suggestion title',
      suggestionParagraph: 'Suggestion paragraph',
      suggestionLabel: 'Suggestion label',
      suggestionDismissLabel: 'Dismiss',
      suggestionUseLabel: 'Use'
    }
    const component = mount(<Suggestions {...expected}><span>Something</span></Suggestions>)
    expect(component.find('.modal').length).toEqual(1)
    component.find('.dismiss a').simulate('click')
    expect(dismissed).toBe(true)
  })

  it('can use suggestion', () => {
    let used = false
    const expected = {
      renderSuggestion: renderSuggestion,
      onSuggestion: () => { used = true },
      suggestions: ['suggestion1', 'suggestion2'],
      withSuggestions: 'true',
      suggestionTitle: 'Suggestion title',
      suggestionParagraph: 'Suggestion paragraph',
      suggestionLabel: 'Suggestion label',
      suggestionDismissLabel: 'Dismiss',
      suggestionUseLabel: 'Use'
    }
    const component = mount(<Suggestions {...expected}><span>Something</span></Suggestions>)
    expect(component.find('.modal').length).toEqual(1)
    component.find('.suggestion .action button').first().simulate('click')
    expect(used).toBe(true)
  })

  it('renders warning messages when not all props are passed', () => {
    const expected = {
      suggestions: [{id: 1}],
      show: true

    }
    const spy = spyOn(console, 'warn')
    let component = mount(<Suggestions {...expected}><span>Something</span></Suggestions>)
    expect(spy).toHaveBeenCalled()
    component.find('.suggestion-btn').simulate('click')
    expect(spy).toHaveBeenCalled()
    component.find('.dismiss').simulate('click')
    expect(spy).toHaveBeenCalled()
  })
})
