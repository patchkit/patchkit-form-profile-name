import React from 'react'
import ModalBtn from 'patchkit-modal/btn'
import FormProfileName from './index'

export default class FormProfileNameDemo extends React.Component {
  render() {
    const onSubmit = (name, cb) => { console.log('submit', name); cb() }
    return <div>
      <h1>patchkit-form-profile-name</h1>
      <section className="form-profile-name">
        <header>&lt;FormProfileName&gt;</header>
        <div className="content">
          <ModalBtn className="fullheight" Form={FormProfileName} formProps={{currentValue: 'bob', className: 'text-center vertical-center', onSubmit: onSubmit}}><a className="btn highlighted">Click to open</a></ModalBtn>
        </div>
      </section>
    </div>
  }
}