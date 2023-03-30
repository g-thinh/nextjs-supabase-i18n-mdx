import { useSupabaseClient } from "@supabase/auth-helpers-react";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { ButtonSubmit, Form, Input, Label, Row, TextError } from "./Form";
import { LoadingDots } from "./LoadingDots";

type FormUpdatePasswordData = {
  new_password: string;
  confirm_new_password: string;
};

export function FormUpdatePassword() {
  const router = useRouter();
  const supabase = useSupabaseClient();
  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors },
  } = useForm<FormUpdatePasswordData>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const { t } = useTranslation(["form"]);

  const handleOnSubmit = handleSubmit(async ({ new_password }) => {
    try {
      const { data, error } = await supabase.auth.updateUser({
        password: new_password,
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

  const validatePassword = (value: string) => {
    if (watch("new_password") !== value) {
      return t("form:update-password.errors.validate-new-password");
    }
  };

  return (
    <Form onSubmit={handleOnSubmit}>
      <h2>{t("form:update-password.title")}</h2>
      <p>{t("form:update-password.text")}</p>
      <Row>
        <Label>{t("form:update-password.new-password")}</Label>
        <Input
          type="password"
          placeholder="secr3t_passw0rd"
          {...register("new_password", { required: true })}
        />
        {errors.new_password?.type === "required" && (
          <TextError>
            {t("form:update-password.errors.required-new-password")}
          </TextError>
        )}
      </Row>
      <Row>
        <Label>{t("form:update-password.confirm-new-password")}</Label>
        <Input
          type="password"
          placeholder="secr3t_passw0rd"
          {...register("confirm_new_password", {
            required: true,
            validate: validatePassword,
          })}
        />
        {errors.confirm_new_password?.type === "required" && (
          <TextError>
            {t("form:update-password.errors.required-confirm-new-password")}
          </TextError>
        )}
        {errors.confirm_new_password?.type === "validate" && (
          <TextError>{errors.confirm_new_password.message}</TextError>
        )}
      </Row>
      {errors.root && (
        <Row>
          <TextError>{errors.root.message}</TextError>
        </Row>
      )}
      <ButtonSubmit type="submit">
        {isSubmitting ? <LoadingDots /> : t("form:update-password.submit")}
      </ButtonSubmit>
    </Form>
  );
}
