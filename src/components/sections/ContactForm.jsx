"use client";

import { Button } from "../ui/Buttons";
import { Mail, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import BottomSlideModal from "../ui/BottomSlideModal";

const ContactPage = () => {
  const t = useTranslations("contact");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      name: e.target[0].value,
      company: e.target[1].value,
      email: e.target[2].value,
      message: e.target[3].value,
    };

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const contentType = res.headers.get("content-type");

      if (!contentType?.includes("application/json")) {
        throw new Error("API did not return JSON");
      }

      const data = await res.json();

      setModalMessage(res.ok ? "Wiadomość wysłana!" : data.error || "Błąd");
      setShowModal(true);

      if (res.ok) e.target.reset();
    } catch (err) {
      console.error(err);
      setModalMessage("Wystąpił błąd.");
      setShowModal(true);
    }
  };

  return (
    <section className="container space-y-16 py-20">
      <h1 className="h1">{t("header")}</h1>

      <div className="mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-16 xl:gap-24 items-start">
        {/* LEFT */}
        <div className="space-y-10 text-lg text-white/80">
          <div className="flex items-start gap-4">
            <div>
              <h2>{t("content.intro")}</h2>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Mail className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="text-n-4">{t("content.email.title")}</p>
              <p>{t("content.email.description")}</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <Phone className="w-5 h-5 text-primary mt-1" />
            <div>
              <p className="text-n-4">{t("content.phone.title")}</p>
              <p>{t("content.phone.description")}</p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-2">
          <form
            className="space-y-10 max-w-3xl ml-auto"
            onSubmit={handleSubmit}
          >
            {/* NAME */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-n-4 mb-2">
                  {t("form.form1")}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white"
                />
              </div>

              <div>
                <label className="block text-sm text-n-4 mb-2">
                  {t("form.form2")}
                </label>
                <input
                  type="text"
                  className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white"
                />
              </div>
            </div>

            {/* EMAIL */}
            <div>
              <label className="block text-sm text-n-4 mb-2">
                {t("form.form3")}
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white"
              />
            </div>

            {/* MESSAGE */}
            <div>
              <label className="block text-sm text-n-4 mb-2">
                {t("form.form4")}
              </label>
              <textarea
                rows="4"
                className="w-full bg-transparent border-b border-white/30 py-2 focus:outline-none focus:border-white resize-none"
              />
            </div>

            {/* SUBMIT */}
            <div className="pt-6">
              <Button type="submit"> {t("form.button")}</Button>
            </div>
          </form>

          <BottomSlideModal
            show={showModal}
            onClose={() => setShowModal(false)}
            message={modalMessage}
          />

          {/* {showModal && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
              <div className="bg-n-8 p-6 rounded-xl shadow-lg max-w-lg text-center space-y-6">
                <p>{modalMessage}</p>

                <button onClick={() => setShowModal(false)}>Zamknij</button>
              </div>
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
