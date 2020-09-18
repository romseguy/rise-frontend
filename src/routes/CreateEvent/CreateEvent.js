import './CreateEvent.scss'

import { isEmpty, map, trim } from 'ramda'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Form, Field, actions, createFieldClass } from 'react-redux-form'
import Geosuggest from 'react-geosuggest'
import translate from 'decorators/translate'
import Dropzone from 'react-dropzone'
import DateTimePickerInput from 'components/common/DateTimePickerInput'

import { modelSelector, thumbnailSelector } from 'redux/modules/createEvent'

import Panel from 'components/common/Panel'
import Button from 'components/common/Button'

import * as CreateEventActions from './actions'

function mapStateToProps(state) {
  return {
    model: modelSelector(state),
    thumbnail: thumbnailSelector(state)
  }
}

function mapDispatchToProps(dispatch) {
  return map(action => bindActionCreators(action, dispatch), CreateEventActions)
}

@translate('CreateEvent')
@connect(mapStateToProps, mapDispatchToProps)
class CreateEvent extends Component {

  handleSubmit({ model }) {
    this.props.onSubmit({
      ...model,
      tags: model.tags.split(',').map(trim),
      thumbnail: this.props.thumbnail
    })
  }

  handleOutsideClick() {
    this.props.onOutsideClick()
  }

  render() {
    const { strings, model, thumbnail, onDrop, onClose, onSuggestSelect, onLocationChange, onDateChange } = this.props

    return (
      <Panel
        className='create-event bk-create-event'
        onOutsideClick={::this.handleOutsideClick}
      >
        <div className='scroll-wrapper'>
          <Button
            className='create-event__close close'
            onClick={onClose}
          >
            X
          </Button>

          <h2 className='like-h2'>{strings.header}</h2>

          <Form
            model='createEvent'
            onSubmit={::this.handleSubmit}
          >
            <Dropzone
              className='image-upload'
              onDrop={onDrop}
              multiple={false}
              accept='image/*'
            >
              <img
                src={!isEmpty(thumbnail) ? thumbnail.preview : '/img/img-input-file-create-event.png'}
              />
            </Dropzone>

            <div className='create-event__date'>
              <DateTimePickerInput
                value={model.date}
                onChange={onDateChange}
                placeholder={strings.date}
              />
            </div>

            <div className='create-event__location'>
              <Geosuggest
                placeholder={strings.location}
                onSuggestSelect={onSuggestSelect}
                onChange={onLocationChange}
                initialValue={model.location}
              />
            </div>

            <div className='share'>
              <span>Share with</span>
              <ul>
                <li>
                  <Button className='icon-facebook2'>Partager sur Facebook</Button>
                </li>
                {/*<li>
                 <Button className='icon-twitter2'>Partager sur Twitter</Button>
                 </li>*/}
              </ul>
            </div>

            <div className='create-event__title'>
              <Field model='createEvent.title'>
                <input type='text' placeholder={strings.title} value={model.title}/>
              </Field>
            </div>

            <div className='create-event__tags'>
              <Field model='createEvent.tags'>
                <input type='text' placeholder={strings.tags} value={model.tags}/>
              </Field>
            </div>

            <div className='create-event__description'>
              <Field model='createEvent.description'>
                <textarea placeholder={strings.description} value={model.description}/>
              </Field>
            </div>

            <input type='submit' value={strings.submit}/>
          </Form>
        </div>
      </Panel>
    )
  }
}

export default CreateEvent
