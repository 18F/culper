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
      subsection: props.subsection
    }
  }

  onUpdate (props) {
    let index = props.index
    let field = props.name
    let value = props

    let collection = this.props.List
    collection.forEach((x) => {
      if (x.index === index) {
        x[field] = value
      }
    })

    this.myDispatch(collection)
  }

  myDispatch (collection) {
    this.props.dispatch(updateApplication('OtherNames', 'List', [...collection]))
  }

  noOtherName () {
    this.props.dispatch(push('/form/identifying'))
  }

  render () {
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
              <button onClick={this.addOtherName.bind(this)}>Yes</button>
              <button onClick={this.noOtherName.bind(this)}>No</button>
            </div>
            <Collection min="0"
                        items={this.props.List}
                        dispatch={this.myDispatch.bind(this)}
                        appendLabel="Add another name">
              <Name name="Name"
                    key="name"
                    onUpdate={this.onUpdate.bind(this)}
                    />
              <MaidenName name="MaidenName"
                          key="maidenName"
                          onUpdate={this.onUpdate.bind(this)}
                          />
              <DateRange name="DatesUsed"
                        key="datesUsed"
                        title="Provide dates used"
                        onUpdate={this.onUpdate.bind(this)}
                        />
              <Help name="help" id="alias.reason">
                <Textarea name="Reasons"
                          label="Provide the reasons why the name changed"
                          onUpdate={this.onUpdate.bind(this)}
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
