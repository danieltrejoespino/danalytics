import { GetDesignTokens } from './ThemePrimitives';
import {
  InputsCustomizations,
  DataDisplayCustomizations,
  FeedbackCustomizations,
  NavigationCustomizations,
  SurfacesCustomizations,
} from './customizations/Index';

export default function GetSignInTheme(mode) {
  return {
    ...GetDesignTokens(mode),
    components: {
      ...InputsCustomizations,
      ...DataDisplayCustomizations,
      ...FeedbackCustomizations,
      ...NavigationCustomizations,
      ...SurfacesCustomizations,
    },
  };
}
