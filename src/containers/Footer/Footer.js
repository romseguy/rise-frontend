import './Footer.scss'

import { map } from 'ramda'
import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import translate from 'decorators/translate'

import * as FooterActions from './actions'

function mapStateToProps(state) {
  return {
  }
}

function mapDispatchToProps(dispatch) {
  return map(action => bindActionCreators(action, dispatch), FooterActions)
}

@translate('Footer')
@connect(mapStateToProps, mapDispatchToProps)
class Footer extends Component {

  render() {
    const { strings } = this.props
    return (
      <footer
        role='contentinfo'
        className='footer page-footer-wrapper'
      >
        <ul className='no-list'>
					<li className='social facebook'>
						<a href='#'>{strings.fb}</a>
						<i className='icon-facebook'></i>
					</li>
          {/*<li className='social twitter'>
						<a href='#'>Rejoignez-nous sur Twitter</a>
						<i className='icon-twitter'></i>
					</li>*/}
					<li>
						<a href='#'>{strings.about}</a>
					</li>
					<li>
						<a href='#'>{strings.faq}</a>
					</li>
					<li>
						<a href='#'>{strings.contact}</a>
					</li>
				</ul>
        {/*<Button className='message'>
          <i className='icon-mail'></i>5
        </Button>*/}
      </footer>
    )
  }
}

export default Footer
