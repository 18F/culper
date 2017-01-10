import React from 'react'
import { connect } from 'react-redux'
import AuthenticatedView from '../../../views/AuthenticatedView'
import { Help, MaidenName, Name, Textarea, DateRange } from '../../Form'
import { push } from '../../../middleware/history'
import { updateApplication } from '../../../actions/ApplicationActions'
import { SectionViews, SectionView } from '../SectionView'

class OtherNamesUsed extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      subsection: props.subsection
    }

    this.handleTour = this.handleTour.bind(this)
    this.handleReview = this.handleReview.bind(this)
  }

  handleTour (event) {
    this.props.dispatch(push('/form/othernames/name'))
  }

  handleReview (event) {
    this.props.dispatch(push('/form/othernames/review'))
  }

  onUpdate (id, field, values) {
    let list = this.props.List
    for (let x = 0; x < list.length; x++) {
      if (list[x].ID === id) {
        list[x][field] = values
      }
    }
    this.props.dispatch(updateApplication('OtherNames', 'List', [...list]))
  }

  addOtherName () {
    let list = this.props.List
    list.push({
      ID: new Date().getTime(),
      Name: '',
      MaidenName: '',
      Used: '',
      Reason: ''
    })
    this.props.dispatch(updateApplication('OtherNames', 'List', [...list]))
  }

  noOtherName () {
    this.props.dispatch(push('/form/identifying'))
  }

  keyName (id, bit) {
    return '' + id + '-' + bit
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
            {
              this.props.List.map((x) => {
                return (
                  <div key={x.ID}>
                    <Name
                      key={this.keyName(x.ID, 'name')}
                      {...x.Name}
                      onUpdate={this.onUpdate.bind(this, x.ID, 'Name')}
                    />

                    <MaidenName
                      key={this.keyName(x.ID, 'maiden')}
                      value={x.MaidenName}
                      onUpdate={this.onUpdate.bind(this, x.ID, 'MaidenName')}
                    />

                    <DateRange
                      key={this.keyName(x.ID, 'used')}
                      {...x.DatesUsed}
                      onUpdate={this.onUpdate.bind(this, x.ID, 'DatesUsed')}
                      title="Provide dates used"
                    />
                    <Help id="alias.reason.help">
                      <Textarea
                        key={this.keyName(x.ID, 'reason')}
                        value={x.Reasons}
                        onUpdate={this.onUpdate.bind(this, x.ID, 'Reasons')}
                        label={'Provide the reasons why the name changed'}
                      />
                    </Help>
                  </div>
                )
              })
            }
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
