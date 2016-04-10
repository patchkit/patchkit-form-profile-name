import React from 'react'

export default class FormProfileName extends React.Component {
  static propTypes = {
    setIsValid: React.PropTypes.func.isRequired,
    setHelpText: React.PropTypes.func.isRequired,
    onSubmit: React.PropTypes.func.isRequired,
    isOtherUser: React.PropTypes.bool,
    currentValue: React.PropTypes.string,
    className: React.PropTypes.string
  }

  constructor(props) {
    super(props)
    this.state = this.validate(this.props.currentValue||'', true)
  }

  componentDidMount() {
    this.validate(this.state.name) // emit isValid update
    if (this.props.isOtherUser)
      this.props.setHelpText('You can rename anybody. It will only change for you, but other people will see the name you chose.')
  }

  onChangeName(e) {
    this.setState(this.validate(e.target.value))
  }

  validate (name, supressEmit) {
    let badNameCharsRegex = /[^A-z0-9\._-]/
    const emit = (b) => { !supressEmit && this.props.setIsValid(b) }
    if (!name.trim()) {
      emit(false)
      return { error: false, isValid: false, name: name }
    } else if (badNameCharsRegex.test(name)) {
      emit(false)
      return {
        name: name,
        error: 'We\'re sorry, names can only include A-z 0-9 . _ - and cannot have spaces.',
        isValid: false
      }
    } else if (name.slice(-1) == '.') {
      emit(false)
      return {
        name: name,
        error: 'We\'re sorry, names cannot end with a period.',
        isValid: false
      }
    } else {
      emit(true)
      return {
        name: name,
        error: false,
        isValid: true
      }
    }
  }

  submit(cb) {
    this.props.onSubmit(this.state.name, cb)
  }

  render() {
    var fallbackCurrentValue = ''
    if (this.props.isOtherUser)
      fallbackCurrentValue = 'them'
    return <div className={this.props.className}>
      <h1><span>What would you like {this.props.currentValue||fallbackCurrentValue} to be called?</span></h1>
      <form className="block" onSubmit={e=>e.preventDefault()}>
        <fieldset>
          <div>
            <label>
              <input type="text" onChange={this.onChangeName.bind(this)} value={this.state.name} />
              { this.state.error ? <p className="error">{this.state.error}</p> : '' }
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  }
}