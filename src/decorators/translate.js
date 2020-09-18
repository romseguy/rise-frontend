import React from 'react'
import hoistStatics from 'hoist-non-react-statics'
import getDisplayName from 'react-display-name'
import languages from 'lib/languages'

export default function translate(key) {
  return function wrapWithTranslate(WrappedComponent) {
    class Translate extends React.Component {
      static displayName = `Translate(${getDisplayName(WrappedComponent)}`;

      static contextTypes = {
        currentLanguage: React.PropTypes.string
      };

      render() {
        const strings = languages[this.context.currentLanguage][key] || languages.en[key]
        return <WrappedComponent {...this.props} strings={strings}/>
      }
    }

    return hoistStatics(Translate, WrappedComponent)
  }
}
