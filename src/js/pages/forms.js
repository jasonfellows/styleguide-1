import Checkbox from '../components/forms/fields/checkbox';
import EditLabel from '../components/forms/edit-label';
import FileField from '../components/forms/fields/file';
import Moment from 'moment';
import NumberField from '../components/forms/fields/number';
import Radio from '../components/forms/fields/radio';
import React from 'react';
import DateField from '../components/forms/fields/date/date';
import FieldSet from '../components/forms/field-set';
import Select from 'react-select';
import SelectField from '../components/forms/fields/select/select';
import Styleguide from '../styleguide';
import TextArea from '../components/forms/fields/textarea';
import TextField from '../components/forms/fields/text';

var options = [
  { value: 'london', label: 'London' },
  { value: 'newyork', label: 'New York' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'san_francisco', label: 'San Francisco' }
];

var simpleSelectOptions1 = ['London', 'New York', 'Chicago', 'San Francisco'];

var simpleSelectOptions2 = {
  10: 'London',
  15: 'New York',
  25: 'Chicago' ,
  50: 'San Francisco'
};

function _onChange(val) {
  console.log("Selected: " + val);
}

function _onFocus() {
  console.log("Focus");
}

export default React.createClass({
  displayName: "FormsPage",

  getInitialState() {
    return {
      editLabel: "Label",
      simpleSelect1Value: null,
      simpleSelect2Value: null,
      simpleSelect3Value: 15,
      simpleSelect4Value: 25,
      simpleSelect5Value: null,
    };
  },

  pushPullToday(offset) {
    var d = new Date();
    return new Date(d.setDate(d.getDate()+offset));
  },

  onSimpleSelect1Change() {
    console.log(this.refs);
    this.setState({simpleSelect1Value: this.refs.simpleSelect1.state.value})
  },

  onSimpleSelect2Change() {
    this.setState({simpleSelect2Value: this.refs.simpleSelect2.state.value})
  },

  onSimpleSelect3Change() {
    this.setState({simpleSelect3Value: this.refs.simpleSelect3.state.value})
  },

  onSimpleSelect4Change() {
    this.setState({simpleSelect4Value: this.refs.simpleSelect4.state.value})
  },

  onSimpleSelect5Change() {
    this.setState({simpleSelect5Value: this.refs.simpleSelect5.state.value})
  },

  _onSave(value) {
    this.setState({ editLabel: value });
  },

  _onDelete() {
    console.log("Not able to delete right now.");
  },

  _validate(val) {
    return val.length;
  },

  render() {
    return <Styleguide title="Forms Styles">
        <div title="Forms">
          <form className="clearfix">
            <hr />
            <p>Default fields</p>
            <TextField label="Text" fieldColor='light' placeholder="Placeholder" extraClasses={['py2']} />
            <NumberField label="Number" fieldColor='light' extraClasses={['py2']} units="Units"  />
            <DateField dateFormat='MMM D, YYYY'
                       extraClasses={['py2']}
                       fieldColor='light'
                       label='Date'
                       placeholder="Placeholder" />
            <div className='clearfix'></div>
            <SelectField label="Select" fieldColor='light' options={simpleSelectOptions1} promptText="- Select -" extraClasses={['py2']}/>
            <TextArea label="Textarea" fieldColor='light'  extraClasses={['py2']} />
            <TextArea label="Textarea Expandable" fieldColor='light' expandable={true} extraClasses={['py2']} />
            <Checkbox label="Checkbox" fieldColor='light' extraClasses={['py2']}/>
            <Checkbox label="Checked read-only" fieldColor='light' readOnly={true} checked={true} extraClasses={['py2']}/>
            <Radio name="radios1" fieldColor='light' label="Radio 1" extraClasses={['py2']}/>
            <Radio name="radios1" fieldColor='light' label="Radio 2" extraClasses={['py2']}/>

            <p className="mt4">Disabled fields</p>
            <TextField label="Text" fieldColor='light' placeholder="Placeholder" disabled={true} extraClasses={['py2']} />
            <NumberField label="Number" fieldColor='light' disabled={true} extraClasses={['py2']} />
            <DateField date="2015/1/1" label="ReactDate" fieldColor='light' disabled={true} extraClasses={['py2']} dateFormat='YYYY/MM/DD'/>
            <div className='clearfix'></div>
            <SelectField label="Simple Select" fieldColor='light' options={simpleSelectOptions1} disabled={true} extraClasses={['py2']}/>
            <TextArea label="Textarea" fieldColor='light'  disabled={true} extraClasses={['py2']} />
            <Checkbox label="Checkbox" fieldColor='light' disabled={true} extraClasses={['py2']}/>
            <Radio name="radios2" fieldColor='light' label="Radio" disabled={true} extraClasses={['py2']} />

            <p className="mt4">Fields within grey block</p>
            <FieldSet>
              <p>Default fields</p>
              <TextField label="Text" fieldColor='dark' placeholder="Placeholder" extraClasses={['py2']}/>
              <NumberField label="Number" fieldColor='dark' extraClasses={['py2']} units="Units" />
              <DateField label="Date" fieldColor='dark' extraClasses={['py2']} dateFormat='MMM D, YYYY'/>
              <div className='clearfix'></div>
              <SelectField label="Simple Select" fieldColor='dark' options={simpleSelectOptions1} promptText="- Select -" extraClasses={['py2']}/>
              <TextArea label="Textarea" fieldColor='dark' extraClasses={['py2']}/>
              <Checkbox label="Checkbox" fieldColor='dark' extraClasses={['py2']}/>
              <Checkbox label="Checked read-only" fieldColor='dark' readOnly={true} checked={true} extraClasses={['py2']}/>
              <Radio name="radios3" fieldColor='dark' label="Radio 1" extraClasses={['py2']}/>
              <Radio name="radios3" fieldColor='dark' label="Radio 2" extraClasses={['py2']}/>
              <hr className="bc-white"/>
              <p>Disabled fields</p>
              <TextField label="Text" fieldColor='dark' placeholder="Placeholder" disabled={true} extraClasses={['py2']} />
              <NumberField label="Number" fieldColor='dark' disabled={true} extraClasses={['py2']} />
              <DateField label="ReactDate" fieldColor='dark' disabled={true} extraClasses={['py2']} dateFormat='MMM D, YYYY' />
              <div className='clearfix'></div>
              <SelectField label="Simple Select" fieldColor='dark' options={simpleSelectOptions1} disabled={true} extraClasses={['py2']}/>
              <TextArea label="Textarea" fieldColor='dark' disabled={true} extraClasses={['py2']} />
              <Checkbox label="Checkbox" fieldColor='dark' disabled={true} extraClasses={['py2']}/>
              <Checkbox label="Checked read-only" fieldColor='dark' readOnly={true} checked={true} extraClasses={['py2']}/>
              <Radio name="radios2" fieldColor='dark' label="Radio" disabled={true} extraClasses={['py2']} />
            </FieldSet>

            <hr />

            <h3>React Select</h3>
            <p><a href="https://github.com/JedWatson/react-select">https://github.com/JedWatson/react-select</a></p>
            <div className="col-3 left mr2">
              <label className="px2 mb1">Default</label>
              <Select
                searchable={false}
                name="form-field-nameczXCzx"
                options={options}
                onChange={_onChange}
                placeholder="- Select Office -"
              />
            </div>
            <div className="col-3 left mr2">
              <label className="px2 mb1">Multi</label>
              <Select
                searchable={false}
                multi={true}
                name="form-field-nameczXCzx"
                options={options}
                onChange={_onChange}
                placeholder="- Select Office -"
              />
            </div>
            <div className="col-3 left mr2">
              <label className="px2 mb1">Searchable (like Chosen)</label>
              <Select
                name="form-field-nameczXCzx"
                options={options}
                onChange={_onChange}
                placeholder="- Select Office -"
                onFocus={_onFocus}
              />
            </div>
          </form>
          <hr />
        </div>

        <div title="Simple Select">
          <p>A very simple select component without the bells and whistles.  Meant for use in place of an html select.</p>
          <div className="mb3">
            <h3>Options as an array</h3>
            <div className="py1 mb2">
              <code className="language-javascript overflow-scroll">
               ["London","New York","Chicago","San Francisco"]
              </code>
            </div>
            <SelectField
              onChange={this.onSimpleSelect1Change}
              name='city'
              ref='simpleSelect1'
              options={simpleSelectOptions1}
              placeholder="- Select City -"/>
            <p className='py2'>selected value: {this.state.simpleSelect1Value}</p>
          </div>
          <div className="mb3">
            <h3>Options as an object</h3>
            <div className="py1 mb2">
              <code className="language-javascript overflow-scroll">
               {'{10:"London", 15:"New York", 25:"Chicago", 50:"San Francisco"}'}
              </code>
            </div>
            <SelectField
              onChange={this.onSimpleSelect2Change}
              name='city'
              ref='simpleSelect2'
              options={simpleSelectOptions2}
              placeholder="- Select -"/>
            <p className='py2'>selected value: {this.state.simpleSelect2Value}</p>
          </div>
          <div className="mb3">
            <h3>Selected value</h3>
            <p>New York is selected</p>
            <SelectField
              onChange={this.onSimpleSelect3Change}
              value={this.state.simpleSelect3Value}
              name='city'
              ref='simpleSelect3'
              options={simpleSelectOptions2}
              placeholder="- Select -"/>
            <p className='py2'>selected value: {this.state.simpleSelect3Value}</p>
          </div>
          <div className="mb3">
            <h3>Errors</h3>
            <p>With an error</p>
            <SelectField
              name='city'
              onChange={this.onSimpleSelect4Change}
              errors={["That's no good!"]}
              options={simpleSelectOptions2}
              placeholder="- Select -"
              ref='simpleSelect4'
              value={this.state.simpleSelect4Value}/>
            <p className='py2'>selected value: {this.state.simpleSelect4Value}</p>
          </div>
          <div className="mb3">
            <h3>Include a blank option</h3>
            <SelectField
              includeBlank={true}
              onChange={this.onSimpleSelect5Change}
              value={this.state.simpleSelect5Value}
              borderColorClass={this.state.simpleSelect5Value == 25 ? 'bc-orange' : void 0}
              name='city'
              ref='simpleSelect5'
              options={simpleSelectOptions2}
              placeholder="- Select -"/>
            <p className='py2'>selected value: {this.state.simpleSelect5Value}</p>
          </div>
        </div>

        <div title="Actionable Forms">
          <hr />
          <h3>EditLabel</h3>
          <p>An interactive component for changing the text of a label, i.e. Folder Names.</p>
          <EditLabel
            label={this.state.editLabel}
            placeholder="Folder Name"
            onSave={this._onSave}
            onDelete={this._onDelete}
            isValid={this._validate}
            errorMessage="Folder Name Already In Use"
          >
            <p className="clearfix small">Do you want to delete "{this.state.editLabel}"?</p>
          </EditLabel>

          <pre><code className="language-javascript overflow-scroll mt3">
          {'<EditLabel label={this.state.editLabel} placeholder="Folder Name" onSave={this._onSave} onDelete={this._onDelete} isValid={this._validate} errorMessage="Folder Name Already In Use" >\n'}
          {'\t<p className="clearfix small">Do you want to delete "{this.state.editLabel}"?</p>\n'}
          {'</EditLabel>'}
          </code></pre>

          <h3 className="mt4">File Input</h3>
          <p className="small">An interactive file component with file name preview.</p>
          <FileField labelTitle="Upload File" labelStyles={["button-secondary", "white", "rounded-2", "p1"]} icon="upload" />
        </div>

        <div title="Date Fields">
          <DateField dateFormat='MMM D, YYYY'
                     extraClasses={['py2']}
                     fieldColor='light'
                     value={new Date} />
          <div className='clearfix'></div>
          <DateField dateFormat='MMM D, YYYY'
                     extraClasses={['py2']}
                     fieldColor='light'
                     label="With Min/Max Dates"
                     maxDate={this.pushPullToday(35)}
                     minDate={this.pushPullToday(-5)}
                     value={new Date} />
          <div className='clearfix'></div>
          <DateField dateFormat='MMM D, YYY'
                     extraClasses={['py2']}
                     fieldColor='light'
                     label="With bad format string" />
          <div className='clearfix'></div>
          <DateField dateFormat='MMM D, YYYY'
                     errors={['You broke it!', 'Time is irrelevant']}
                     extraClasses={['py2']}
                     fieldColor='light'
                     label="With errors" />
          <div className='clearfix'></div>
        </div>
      </Styleguide>
  }
});
