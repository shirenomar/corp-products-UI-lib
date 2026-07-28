import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { InputComponent, ValidationErrorsPipe } from "@corp-products/ui-components";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { CommonModule, NgClass, NgStyle } from "@angular/common";
import { TranslatePipe } from "@ngx-translate/core";
import { FloatLabelModule, FloatLabelStyle } from "primeng/floatlabel";
import { IconField } from "primeng/iconfield";
import { InputIcon } from "primeng/inputicon";
import { InputNumberModule, InputNumberStyle } from "primeng/inputnumber";
import { InputText } from "primeng/inputtext";
import { Textarea } from "primeng/textarea";

const meta:  Meta<InputComponent>  = {
  title: 'MyLibrary/Input',
  component: InputComponent,
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        ReactiveFormsModule,
        InputText,
        Textarea,
        ValidationErrorsPipe,
        NgClass,
        NgStyle,
        TranslatePipe,
        FloatLabelModule,
        InputIcon,
        IconField,
        InputNumberModule
      ],
      providers: [FloatLabelStyle, InputNumberStyle],
    })
  ],
  tags: ['autodocs'],
  args: {
    control: new FormControl<string>(''),
    name: 'input',
    label: 'Input',
    placeholder: 'Enter your input',
    inputId: 'input',
    readonly: false,
    disabled: false,
    hint: 'This is a hint',
    type: 'text',
    contentType: 'text',
    size: 'small',
    prefix: '',
    rows: 2,
    cols: 20,
    maxLength: 100,
    autoResize: false,
    basicInput: false,
    noStyle: false,
    canClear: false,
    hideOptionalLabel: false,
    inputDirection: 'inherit',
    variant: 'over',
    defaultColor: '#DFE0E6',
    iconClass: '',
    iconPosition: 'left',
  },
  argTypes: {
    control: { control: 'object' },
    name: { control: 'text' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    inputId: { control: 'text' },
    readonly: { control: 'boolean' },
    disabled: { control: 'boolean' },
    hint: { control: 'text' },
    type: { control: 'select', options: ['text', 'textarea', 'withIcon', 'number'] },
    contentType: { control: 'select', options: ['text', 'email', 'number'] },
    size: { control: 'select', options: ['small', 'large'] },
    prefix: { control: 'text' },
    rows: { control: 'number' },
    cols: { control: 'number' },
    maxLength: { control: 'number' },
    autoResize: { control: 'boolean' },
    basicInput: { control: 'boolean' },
    noStyle: { control: 'boolean' },
    canClear: { control: 'boolean' },
    hideOptionalLabel: { control: 'boolean' },
    inputDirection: { control: 'select', options: ['ltr', 'rtl', 'inherit'] },
    variant: { control: 'select', options: ['in', 'over', 'on'] },
    defaultColor: { control: 'color' },
    iconClass: { control: 'text' },
    iconPosition: { control: 'select', options: ['left', 'right'] },
  },
};

export default meta;
type Story = StoryObj<InputComponent>;

export const Default: Story = {};


