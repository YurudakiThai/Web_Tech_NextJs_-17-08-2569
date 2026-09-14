"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Game, GameStatus } from "@/src/types/game";
import { GAME_STATUSES, GAME_STATUS_LABELS } from "@/src/types/game";

export type GameDraft = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus;
  image: string;
};

const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: "",
  status: "not-started",
  image: "",
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;
type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

function toDraft(game?: Game): GameDraft {
  if (!game) return emptyDraft;
  return {
    name: game.name,
    platform: game.platform,
    hours: String(game.hours),
    status: game.status,
    image: game.image,
  };
}

function validate(value: GameDraft): FormErrors {
  const nextErrors: FormErrors = {};
  if (value.name.trim() === "") nextErrors.name = "กรุณาระบุชื่อเกม";
  if (value.platform === "") nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
  const hours = Number(value.hours);
  if (!Number.isInteger(hours) || hours <= 0) {
    nextErrors.hours = "จำนวนชั่วโมงต้องเป็นจำนวนเต็มบวก";
  }
  return nextErrors;
}

export default function GameForm({ initialGame, onSave, onCancel }: GameFormProps) {
  const [draft, setDraft] = useState<GameDraft>(toDraft(initialGame));
  const [errors, setErrors] = useState<FormErrors>({});

  function handleChange(event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const name = event.target.name as keyof GameDraft;
    const value = event.target.value;
    setDraft((prev) => {
      if (name === "status") return { ...prev, status: value as GameStatus };
      return { ...prev, [name]: value } as GameDraft;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(draft);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;
    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <h2 className="text-lg font-semibold text-white m-0">
        {initialGame ? "แก้ไขเกม" : "เพิ่มเกมใหม่"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="label">ชื่อเกม</label>
          <input
            id="name" name="name" type="text"
            value={draft.name} onChange={handleChange}
            className={errors.name ? "input-error" : "input"}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && <p id="name-error" className="error-text">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor="platform" className="label">แพลตฟอร์ม</label>
          <select
            id="platform" name="platform"
            value={draft.platform} onChange={handleChange}
            className={errors.platform ? "input-error select" : "select"}
          >
            <option value="">-- เลือกแพลตฟอร์ม --</option>
            <option value="PC">PC</option>
            <option value="PlayStation">PlayStation</option>
            <option value="Xbox">Xbox</option>
            <option value="Switch">Switch</option>
            <option value="Mobile">Mobile</option>
          </select>
          {errors.platform && <p id="platform-error" className="error-text">{errors.platform}</p>}
        </div>

        <div>
          <label htmlFor="hours" className="label">จำนวนชั่วโมง</label>
          <input
            id="hours" name="hours" type="number"
            inputMode="numeric" min="1"
            value={draft.hours} onChange={handleChange}
            className={errors.hours ? "input-error" : "input"}
          />
          {errors.hours && <p id="hours-error" className="error-text">{errors.hours}</p>}
        </div>

        <div>
          <label htmlFor="status" className="label">สถานะ</label>
          <select
            id="status" name="status"
            value={draft.status} onChange={handleChange}
            className="select"
          >
            {GAME_STATUSES.map((status) => (
              <option key={status} value={status}>
                {GAME_STATUS_LABELS[status]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="image" className="label">URL หน้าปก (ไม่บังคับ)</label>
        <input
          id="image" name="image" type="url"
          placeholder="https://..."
          value={draft.image} onChange={handleChange}
          className="input"
        />
      </div>

      <div className="flex gap-2 pt-2">
        <button type="submit" className="btn-primary">
          <i className="i-lucide-save" /> บันทึก
        </button>
        <button type="button" onClick={onCancel} className="btn-ghost">
          ยกเลิก
        </button>
      </div>
    </form>
  );
}
