"use client";

import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

export default function ProfileForm({ user, dir }) {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: session, update: updateSession } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [formData, setFormData] = useState({
    name: user.name || "",
    email: user.email || "",
    bio: user.bio || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      const response = await fetch("/api/profile/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      // Update the session with the new user data
      await updateSession({
        ...session,
        user: {
          ...session.user,
          ...data.user
        }
      });

      setSuccess(t("profile-updated-successfully"));
      setIsEditing(false);
      router.refresh();
    } catch (error) {
      setError(error.message || t("error-updating-profile"));
    } finally {
      setIsLoading(false);
    }
  };

  // Update form data when session changes
  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || "",
        email: session.user.email || "",
        bio: session.user.bio || "",
      });
    }
  }, [session]);

  return (
    <div className="bg-neutral shadow-xl rounded-lg p-6">
      {error && (
        <div className="alert alert-error mb-4">
          <span>{error}</span>
        </div>
      )}
      {success && (
        <div className="alert alert-success mb-4">
          <span>{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex justify-between items-center mb-6">
          <div className="avatar">
            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                alt="Profile"
              />
            </div>
          </div>
          <button
            type="button"
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-secondary"
          >
            {isEditing ? t("cancel") : t("edit-profile")}
          </button>
        </div>

        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("name")}</span>
          </label>
          <input
            type="text"
            className="input input-bordered"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            disabled={!isEditing}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("email")}</span>
          </label>
          <input
            type="email"
            className="input input-bordered"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
            disabled={!isEditing}
          />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">{t("bio")}</span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
          />
        </div>

        {isEditing && (
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="btn btn-ghost"
              disabled={isLoading}
            >
              {t("cancel")}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                t("save-changes")
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
