"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const languages = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "fr", name: "French" },
    { code: "de", name: "German" },
    { code: "it", name: "Italian" },
    { code: "pt", name: "Portuguese" },
    { code: "ja", name: "Japanese" },
    { code: "ko", name: "Korean" },
    { code: "zh", name: "Chinese" },
    { code: "ar", name: "Arabic" },
    { code: "ru", name: "Russian" },
    { code: "hi", name: "Hindi" },
];

interface LanguageSelectorProps {
    value: string | null;
    onValueChange: (value: string) => void;
    disabled?: boolean;
}

export function LanguageSelector({
    value,
    onValueChange,
    disabled,
}: LanguageSelectorProps) {
    return (
        <Select value={value ?? undefined} onValueChange={onValueChange} disabled={disabled}>
            <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
                {languages.map((lang) => (
                    <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
}
