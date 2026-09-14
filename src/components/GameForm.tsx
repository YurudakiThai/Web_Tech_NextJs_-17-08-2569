"use client";

import { useState, type ChangeEvent, type FormEvent } from "react";
import type { Game, GameStatus } from "../types/game";
import { GAME_STATUSES, GAME_STATUS_LABELS } from "../types/game";

export type GameDraft = {
  name: string;
  platform: string;
  hours: string;
  status: GameStatus;
};

const emptyDraft: GameDraft = {
  name: "",
  platform: "",
  hours: "",
  status: "not-started",
};

type FormErrors = Partial<Record<keyof GameDraft, string>>;

type GameFormProps = {
  initialGame?: Game;
  onSave: (draft: GameDraft) => void;
  onCancel: () => void;
};

function toDraft(game?: Game): GameDraft {
  if (!game) {
    return emptyDraft;
  }

  return {
    name: game.name,
    platform: game.platform,
    hours: String(game.hours),
    status: game.status,
  };
}

function validate(value: GameDraft): FormErrors {
  const nextErrors: FormErrors = {};

  if (value.name.trim() === "") {
    nextErrors.name = "กรุณาระบุชื่อเกม";
  }

  if (value.platform === "") {
    nextErrors.platform = "กรุณาเลือกแพลตฟอร์ม";
  }

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
      if (name === "status") {
        return { ...prev, status: value as GameStatus };
      }

      return { ...prev, [name]: value } as GameDraft;
    });
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nextErrors = validate(draft);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(draft);
    setDraft(emptyDraft);
    setErrors({});
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <label htmlFor="name">ชื่อเกม</label>
      <input
        id="name"
        name="name"
        type="text"
        value={draft.name}
        onChange={handleChange}
        aria-invalid={!!errors.name}
        aria-describedby={errors.name ? "name-error" : undefined}
      />
      {errors.name ? <p id="name-error">{errors.name}</p> : null}

      <label htmlFor="platform">แพลตฟอร์ม</label>
      <select
        id="platform"
        name="platform"
        value={draft.platform}
        onChange={handleChange}
        aria-invalid={!!errors.platform}
        aria-describedby={errors.platform ? "platform-error" : undefined}
      >
        <option value="">เลือกแพลตฟอร์ม</option>
        <option value="PC">PC</option>
        <option value="PlayStation">PlayStation</option>
        <option value="Xbox">Xbox</option>
        <option value="Switch">Switch</option>
        <option value="Mobile">Mobile</option>
      </select>
      {errors.platform ? <p id="platform-error">{errors.platform}</p> : null}

      <label htmlFor="hours">จำนวนชั่วโมง</label>
      <input
        id="hours"
        name="hours"
        type="number"
        inputMode="numeric"
        min="1"
        value={draft.hours}
        onChange={handleChange}
        aria-invalid={!!errors.hours}
        aria-describedby={errors.hours ? "hours-error" : undefined}
      />
      {errors.hours ? <p id="hours-error">{errors.hours}</p> : null}

      <label htmlFor="status">สถานะ</label>
      <select id="status" name="status" value={draft.status} onChange={handleChange}>
        {GAME_STATUSES.map((status) => (
          <option key={status} value={status}>
            {GAME_STATUS_LABELS[status]}
          </option>
        ))}
      </select>

      <button type="submit">บันทึก</button>
      {initialGame ? (
        <button type="button" onClick={onCancel}>
          ยกเลิก
        </button>
      ) : null}
    </form>
  );
}
