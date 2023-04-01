import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useForm } from "react-hook-form";
import { ButtonSubmit, Form, Input, Label, Row, TextError } from "./Form";
import { LoadingDots } from "./LoadingDots";

type FormForgotPasswordData = {
  email: string;
};

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export function FormForgotPassword() {
  const supabase = useSupabaseClient();
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting, errors, isSubmitSuccessful },
  } = useForm<FormForgotPasswordData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const { t } = useTranslation(["form"]);

  const handleOnSubmit = handleSubmit(async ({ email }) => {
    try {
      const redirectUrl = new URL("update-password", BASE_URL);

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: redirectUrl.href,
      });

      if (error) {
        throw new Error(error.message);
      }

      clearErrors();
    } catch (e) {
      const error = e as Error;
      setError("root", { message: error.message });
    }
  });

  return (
    <>
      {isSubmitSuccessful ? (
        <Form as="div">
          <h2>{t("form:forgot-password.submitted.title")}</h2>
          <p>{t("form:forgot-password.submitted.text")}</p>
        </Form>
      ) : (
        <Form onSubmit={handleOnSubmit}>
          <h2>{t("form:forgot-password.title")}</h2>
          <p>{t("form:forgot-password.text")}</p>
          <Row>
            <Label>{t("form:forgot-password.email")}</Label>
            <Input
              type="email"
              placeholder="my_email@example.com"
              {...register("email", { required: true })}
              css={{ width: "100%" }}
            />
            {errors.email?.type === "required" && (
              <TextError>
                {t("form:forgot-password.errors.required-email")}
              </TextError>
            )}
          </Row>
          {errors.root && (
            <Row>
              <TextError>{errors.root.message}</TextError>
            </Row>
          )}
          <ButtonSubmit type="submit">
            {isSubmitting ? <LoadingDots /> : t("form:forgot-password.submit")}
          </ButtonSubmit>
        </Form>
      )}
    </>
  );
}
