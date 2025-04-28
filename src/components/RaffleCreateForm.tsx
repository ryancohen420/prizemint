"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RaffleCreateForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [ticketSupply, setTicketSupply] = useState(100);
  const [priceEth, setPriceEth] = useState(0.01);
  const [endsAt, setEndsAt] = useState("");

  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const router = useRouter();

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      // 5MB limit
      alert("File size must be under 5MB");
      return;
    }

    setUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "prizemint_unsigned"); // your preset
    formData.append("folder", "raffles"); // folder

    try {
      const xhr = new XMLHttpRequest();
      xhr.open(
        "POST",
        "https://api.cloudinary.com/v1_1/dd3z6cdq5/image/upload"
      );

      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          const percent = Math.round((e.loaded * 100) / e.total);
          setUploadProgress(percent);
        }
      });

      xhr.onload = () => {
        const res = JSON.parse(xhr.responseText);
        if (res.secure_url) {
          setImageUrl(res.secure_url);
        } else {
          alert("Upload failed");
        }
        setUploading(false);
      };

      xhr.onerror = () => {
        alert("Upload failed. Please try again.");
        setUploading(false);
      };

      xhr.send(formData);
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!imageUrl) {
      alert("Please upload an image first.");
      return;
    }

    const res = await fetch("/api/raffles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        imageUrl,
        ticketSupply,
        priceEth,
        endsAt: endsAt ? new Date(endsAt).toISOString() : null,
      }),
    });

    if (res.ok) {
      const created = await res.json();
      router.push(`/raffle-created?id=${created.id}`);
    } else {
      alert("Failed to create raffle");
    }
  }

  return (
    <div className="space-y-12">
      {/* Create Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Title</label>
          <input
            type="text"
            className="border rounded w-full p-2"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Description</label>
          <textarea
            className="border rounded w-full p-2"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block mb-2">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            className="border rounded w-full p-2"
            onChange={handleImageUpload}
            required={!imageUrl}
          />

          {uploading && (
            <div className="mt-2 text-sm text-muted">
              Uploading: {uploadProgress}%
            </div>
          )}
        </div>

        <div className="flex space-x-4">
          <div className="flex-1">
            <label className="block mb-2">Ticket Supply</label>
            <input
              type="number"
              className="border rounded w-full p-2"
              value={ticketSupply}
              onChange={(e) => setTicketSupply(Number(e.target.value))}
              required
              min={1}
            />
          </div>

          <div className="flex-1">
            <label className="block mb-2">Price (ETH)</label>
            <input
              type="number"
              className="border rounded w-full p-2"
              value={priceEth}
              onChange={(e) => setPriceEth(Number(e.target.value))}
              required
              step="0.0001"
              min={0}
            />
          </div>
        </div>

        <div>
          <label className="block mb-2">End Date & Time</label>
          <input
            type="datetime-local"
            className="border rounded w-full p-2"
            value={endsAt}
            onChange={(e) => setEndsAt(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className="bg-primary hover:bg-secondary text-white font-semibold px-6 py-2 rounded transition"
          disabled={uploading || !imageUrl}
        >
          {uploading ? "Uploading…" : "Create Raffle"}
        </button>
      </form>

      {/* Live Preview */}
      <div className="p-6 mt-12 border border-muted rounded-xl shadow-lg bg-light">
        <h2 className="text-2xl font-bold mb-4 text-center">Live Preview</h2>

        <div className="space-y-4">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Preview"
              className="w-full h-64 object-cover rounded-md"
            />
          )}

          <h3 className="text-xl font-bold">{title || "Your Raffle Title"}</h3>

          <p className="text-mid">
            {description || "Description of your collectible or prize."}
          </p>

          <div className="text-dark font-semibold">
            🎟️ {ticketSupply || 0} Tickets @ {priceEth || 0} ETH each
          </div>

          {endsAt && (
            <div className="text-sm text-muted">
              ⏰ Ends: {new Date(endsAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
