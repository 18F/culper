import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Help, Collection, MaidenName, Name, Textarea, DateRange } from '../../Form'
import { updateApplication } from '../../../actions/ApplicationActions'
import { push } from '../../../middleware/history'
import { SectionViews, SectionView } from '../SectionView'

class OtherNamesUsed extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      subsection: props.subsection,
      showCollection: false
    }
  }

  myDispatch (collection) {
    this.props.dispatch(updateApplication('OtherNames', 'List', [...collection]))
  }

  startSection () {
    this.setState({ showCollection: true })
  }

  skipSection () {
    this.props.dispatch(push('/form/identifying'))
  }

  render () {
    if (this.props.List.length === 0 && !this.state.showCollection) {
      return (
        <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
          <SectionView
            name=""
            next="identifying"
            nextLabel="Your Identifying Information">
            <div className="other-names-used">
              <h2>Other names used</h2>
              <p>Provide your other names used and the period of time you used them (for example: your maiden name, name(s) by a former marriage, former name(s), alias(es), or nickname(s)).</p>
              <div>
                Have you used any other names?
              </div>
              <div>
                <button onClick={this.startSection.bind(this)}>Yes</button>
                <button onClick={this.skipSection.bind(this)}>No</button>
              </div>
            </div>
          </SectionView>
        </SectionViews>
      )
    }

    return (
      <SectionViews current={this.props.subsection} dispatch={this.props.dispatch}>
        <SectionView
          name=""
          next="identifying"
          nextLabel="Your Identifying Information">
          <div className="other-names-used">
            <Collection min="0"
                        items={this.props.List}
                        dispatch={this.myDispatch.bind(this)}
                        appendLabel="Add another name">
              <Name name="Name"
                    key="name"
                    />
              <MaidenName name="MaidenName"
                          key="maidenName"
                          />
              <DateRange name="DatesUsed"
                         key="datesUsed"
                         title="Provide dates used"
                         />
              <Help name="help" id="alias.reason">
                <Textarea name="Reasons"
                          label="Provide the reasons why the name changed"
                          />
              </Help>
            </Collection>
          </div>
        </SectionView>
      </SectionViews>
    )
  }
}

function mapStateToProps (state) {
  let app = state.application || {}
  let othernames = app.OtherNames || {}
  return {
    List: othernames.List || []
  }
}

export default connect(mapStateToProps)(AuthenticatedView(OtherNamesUsed))
