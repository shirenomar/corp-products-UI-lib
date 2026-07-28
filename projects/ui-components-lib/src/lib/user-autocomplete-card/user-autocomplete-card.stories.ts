import { CommonModule } from "@angular/common";
import { Meta, moduleMetadata, StoryObj } from "@storybook/angular";
import { ButtonModule, ButtonStyle } from "primeng/button";
import { AppButtonComponent } from "../app-button";
import { UserAutocompleteCardComponent } from "./user-autocomplete-card.component";


const meta: Meta<UserAutocompleteCardComponent> = {
  title: 'MyLibrary/autocomplete card',
  component: UserAutocompleteCardComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, ButtonModule],
      providers: [ButtonStyle],
    }),
  ],
  args: {
    userData: {
      name: 'John Doe',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
      email: 'john.doe@example.com',
      contact: {
        mobile: '+1234567890',
      },
    },
    explicitRole: 'Admin',
    showDeleteAction: true,
  },
  argTypes: {
    userData: {
      control: 'object',
      description: 'The data of the user',
    },
    explicitRole: {
      control: 'text',
      description: 'The explicit role of the user',
    },
    showDeleteAction: {
      control: 'boolean',
      description: 'Whether to show the delete action',
    },
    select: {
      action: 'select',
      table: { disable: true },
    },
    delete: {
      action: 'delete',
      table: { disable: true },
    },
  },
};

export default meta;
type Story = StoryObj<UserAutocompleteCardComponent>;

export const Default: Story = {
  args: {
    userData: {
      name: 'John Doe',
      profileImage: 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png',
      email: 'john.doe@example.com',
      contact: {
        mobile: '+1234567890',
      },
    },
    explicitRole: 'Admin',
    showDeleteAction: true,
  },
};
