import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { Trans, useTranslation } from "next-i18next";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ButtonSubmit, Form, Input, Label, Row, TextError } from "./Form";
import { LoadingDots } from "./LoadingDots";

type FormSigninData = {
  email: string;
  password: string;
};

export function FormSignin() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormSigninData>({ mode: "onSubmit", reValidateMode: "onSubmit" });
  const { t } = useTranslation(["common"]);

  const handleOnSubmit = handleSubmit(async ({ email, password }) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        throw new Error(error.message);
      }

      if (data) {
        router.push("/profile");
      }

      clearErrors();
    } catch (e) {
      const error = e as Error;
      setError("root", { message: error.message });
    }
  });

  return (
    <Form onSubmit={handleOnSubmit}>
      <h2>{t("common:form-signin.title")}</h2>
      <p>{t("common:form-signin.text")}</p>
      <Row>
        <Label>{t("common:form-signin.email")}</Label>
        <Input
          type="email"
          placeholder="thinh@example.com"
          {...register("email", { required: true })}
        />
        {errors.email?.type === "required" && (
          <TextError>{t("common:form-signin.errors.required-email")}</TextError>
        )}
      </Row>
      <Row>
        <Label>{t("common:form-signin.password")}</Label>
        <Input
          type="password"
          placeholder="secr3t_passw0rd"
          {...register("password", { required: true })}
        />
        {errors.password?.type === "required" && (
          <TextError>
            {t("common:form-signin.errors.required-password")}
          </TextError>
        )}
      </Row>
      <Row>{errors.root && <TextError>{errors.root.message}</TextError>}</Row>
      <div style={{ display: "flex", alignItems: "center" }}>
        <ButtonSubmit type="submit">
          {isSubmitting ? <LoadingDots /> : t("common:form-signin.submit")}
        </ButtonSubmit>
      </div>
      <p>
        <Trans
          i18nKey={"common:form-signin.signup-cta"}
          t={t}
          components={[
            <NextLink key="common:form-signin.signup-cta" href="/signup" />,
          ]}
        />
      </p>
    </Form>
  );
}
