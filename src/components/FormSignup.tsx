import { Trans, useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useForm } from "react-hook-form";
import { ButtonSubmit, Form, Input, Label, Row, TextError } from "./Form";
import { LoadingDots } from "./LoadingDots";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

type FormSignupData = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
};

export function FormSignup() {
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormSignupData>({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const { t } = useTranslation(["common"]);
  const supabase = useSupabaseClient();

  const handleOnSubmit = handleSubmit(async ({ email, password, username }) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username,
          },
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        console.log("AUTH SUCCESS", data);
      }

      clearErrors();
    } catch (e) {
      const error = e as Error;
      setError("root", { message: error.message });
    }
  });

  const validatePassword = (value: string) => {
    if (watch("password") !== value) {
      return t("common:form-signup.errors.validate-password");
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <h2>{t("form-signup.title")}</h2>
      <p>{t("common:form-signup.text")}</p>
      <Row>
        <Label>{t("common:form-signup.name")}</Label>
        <Input
          type="text"
          placeholder="e.g. John Doe"
          {...register("username", { required: true })}
        />
        {errors.username?.type === "required" && (
          <TextError>{t("common:form-signup.errors.required-name")}</TextError>
        )}
      </Row>
      <Row>
        <Label>{t("common:form-signup.email")}</Label>
        <Input
          type="email"
          placeholder="name@example.com"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <TextError>{t("common:form-signup.errors.required-email")}</TextError>
        )}
      </Row>
      <Row>
        <Label>{t("common:form-signup.password")}</Label>
        <Input
          type="password"
          placeholder="secr3t_passw0rd"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <TextError>
            {t("common:form-signup.errors.required-password")}
          </TextError>
        )}
      </Row>
      <Row>
        <Label>{t("common:form-signup.confirm-password")}</Label>
        <Input
          type="password"
          placeholder="secr3t_passw0rd"
          {...register("confirm_password", {
            required: true,
            validate: validatePassword,
          })}
        />
        {errors.password?.type === "required" && (
          <TextError>
            {t("common:form-signup.errors.required-confirm-password")}
          </TextError>
        )}
        {errors.confirm_password?.type === "validate" && (
          <TextError>{errors.confirm_password.message}</TextError>
        )}
      </Row>
      <Row>{errors.root && <TextError>{errors.root.message}</TextError>}</Row>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ButtonSubmit type="submit">
          {isSubmitting ? <LoadingDots /> : t("common:form-signup.submit")}
        </ButtonSubmit>
      </div>
      <p>
        <Trans
          i18nKey={"common:form-signup.login-cta"}
          t={t}
          components={[
            <NextLink key="common:form-signup.login-cta" href="/signin" />,
          ]}
        ></Trans>
      </p>
    </Form>
  );
}
