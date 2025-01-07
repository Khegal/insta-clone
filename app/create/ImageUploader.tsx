import { CiImageOn } from "react-icons/ci";
import { CgSpinner } from "react-icons/cg";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";

interface ImageUploaderProps {
  setMediaUrl: (url: string) => void;
}

interface FileResponse {
  fileUrl: string;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({
  setMediaUrl,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<FileResponse | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null || e.target.files.length === 0) return;

    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await axios.post<FileResponse>(
        "http://localhost:3333/api/files/fileUpload",
        formData
      );
      setResponse(res.data);
      setMediaUrl(res.data.fileUrl);
    } catch (error) {
      console.error("File upload failed:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex items-center justify-center w-full my-4 rounded aspect-square bg-slate-500">
      {!response && <CiImageOn size={40} />}
      <input
        type="file"
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full opacity-0"
        onChange={handleFileChange}
      />
      {loading && (
        <div className="absolute top-0 left-0 flex items-center justify-center w-full h-full bg-black/80">
          <CgSpinner className="animate-spin" size={40} />
        </div>
      )}
      {response && (
        <Image
          src={response.fileUrl}
          alt="Uploaded preview"
          width="400"
          height="400"
          className="object-cover w-full h-full"
        />
      )}
    </div>
  );
};
