import type { Meta, StoryObj } from '@storybook/angular';
import { moduleMetadata } from '@storybook/angular';
import { IcoMoonIconComponent } from './ico-moon-icon.component';
import selection from '../../../assets/iconsFont/selection.json';

const PREFIX = selection.preferences.fontPref.prefix;

const allIcons = selection.icons.map((item) => ({
  name: item.properties.name,
  className: `${PREFIX}${item.properties.name}`,
  pathCount: item.icon.paths.length > 1 ? item.icon.paths.length : 0,
}));

const meta: Meta<IcoMoonIconComponent> = {
  title: 'MyLibrary/Icons',
  component: IcoMoonIconComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [IcoMoonIconComponent],
    }),
  ],
  args: {
    iconName: 'icon-csv',
    iconClass: 'text-2xl text-primary',
    iconPathCount: 0,
  },
  argTypes: {
    iconName: {
      control: 'text',
      description: 'The name of the icon',
    },
    iconClass: {
      control: 'text',
      description: 'The class of the icon',
    },
    iconPathCount: {
      control: 'number',
      description: 'The number of paths in the icon',
    },
  } as Meta<IcoMoonIconComponent>['argTypes'],
};

export default meta;
type Story = StoryObj<IcoMoonIconComponent>;

export const Default: Story = {
  args: {
    iconName: 'icon-csv',
    iconClass: 'text-2xl text-primary',
    iconPathCount: 0,
  },
};

export const AllIcons: Story = {
  render: () => ({
    props: { icons: allIcons },
    template: `
      <div style="display:grid;grid-template-columns:repeat(auto-fill,minmax(120px,1fr));gap:16px;padding:16px;">
        @for (icon of icons; track icon.className) {
          <div style="display:flex;flex-direction:column;align-items:center;gap:8px;padding:12px;border:1px solid #eee;border-radius:8px;">
            <app-ico-moon-card
              [iconName]="icon.className"
              [iconClass]="'text-2xl'"
              [iconPathCount]="icon.pathCount"
            />
            <code style="font-size:11px;text-align:center;word-break:break-all;">{{ icon.className }}</code>
          </div>
        }
      </div>
    `,
  }),
};
