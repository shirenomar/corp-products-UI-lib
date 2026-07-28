import { provideRouter } from "@angular/router";
import { applicationConfig, Meta, StoryObj } from "@storybook/angular";
import { UserInfoComponent } from "./user-info.component";

const meta:  Meta<UserInfoComponent>  = {
  title: 'MyLibrary/UserInfo',
  component: UserInfoComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [provideRouter([])],
    }),
  ],
  args: {
    profileImage: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
    name: 'John Doe',
  },
  argTypes: {
    profileImage: { control: 'text' },
    name: { control: 'text' },
  },
};

export default meta;
type Story = StoryObj<UserInfoComponent>;

export const Default: Story = {};
