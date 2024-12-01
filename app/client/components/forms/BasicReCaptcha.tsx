import { ThemeContext } from "@client/utils/themes/ThemeContext";
import {
  GoogleReCaptchaCheckbox,
  GoogleReCaptchaProvider,
} from "@google-recaptcha/react";
import { Context } from "@reactivated";
import React, { useContext, useState } from "react";

export const BasicReCaptcha = () => {
  const { recaptcha } = useContext(Context);
  const { isDark } = useContext(ThemeContext);

  const [token, setToken] = useState("");

  const [hydrated, setHydrated] = React.useState(false);
  React.useEffect(() => {
    // This forces a rerender, so the captcha is rendered
    // the second time but not the first
    setHydrated(true);
  }, []);
  if (!hydrated) {
    // Returns null on first render, so the client and server match
    return null;
  }

  return (
    <div className="mb-4 w-fit">
      <input type="hidden" name={recaptcha.token_field_name} value={token} />
      <GoogleReCaptchaProvider type="v2-checkbox" siteKey={recaptcha.site_key}>
        <GoogleReCaptchaCheckbox
          onChange={setToken}
          theme={isDark ? "dark" : "light"}
        />
      </GoogleReCaptchaProvider>
    </div>
  );
};
