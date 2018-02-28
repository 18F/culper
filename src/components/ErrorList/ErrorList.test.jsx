import React from 'react'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { mount } from 'enzyme'
import ErrorList from './ErrorList'

describe('The error list component', () => {
  // Setup
  const middlewares = [ thunk ]
  const mockStore = configureMockStore(middlewares)

  it('renders nothing if no errors are present', () => {
    const store = mockStore({})
    const component = mount(<Provider store={store}><ErrorList /></Provider>)
    expect(component.find('.error-list').length).toBe(0)
  })

  // it('renders list of errors', () => {
  //   const faked = (
  //     <div className="section-content" data-section="identification" data-subsection="name">
  //       <div className="field" data-uuid="1">
  //         <a id="1" name="1" aria-hidden="true" />
  //         <h2 className="title h2">Test field</h2>
  //         <div className="table expand">
  //           <span className="messages error-messages">
  //             <div className="message error">
  //               <i className="fa fa-exclamation"></i>
  //             </div>
  //           </span>
  //         </div>
  //       </div>
  //     </div>
  //   )
  //   const store = mockStore({})
  //   const component = mount(<Provider store={store}><div><ErrorList />{faked}</div></Provider>)
  //   expect(component.find('.error-list').length).toBe(1)
  //   expect(component.find('.error-list .field .title').length).toBe(1)
  //   expect(component.find('.error-list .field .error-messages').length).toBe(1)
  // })
})
