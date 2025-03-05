"use client"

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import { useEffect } from "react";
import { ToggleGroup, ToggleGroupItem } from "@radix-ui/react-toggle-group";
import { Bold, Italic, UnderlineIcon } from "lucide-react";

type EditorProps = {
    content: string;
    setContent: (content: string) => void;
}

export default function Editor({ content, setContent }: EditorProps) {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Image,
            Link,
            Highlight.configure({ multicolor: true }),
        ],
        content: content,
        onUpdate: ({ editor }) => {
            setContent(editor.getHTML());
        },
    });

    useEffect(() => {
        if (editor) {
            editor.commands.setContent(content);
        }
    }, [content, editor]);

    if (!editor) {
        return <div>Carregando editor...</div>;
    }

    return (
        <div className="p-4 border rounded-lg">
            <div className="mb-2 flex gap-2">
                <ToggleGroup type="multiple">
                    <ToggleGroupItem value="bold" aria-label="Toggle bold" onClick={() => editor.chain().focus().toggleBold().run()}>
                        <Bold className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="italic" aria-label="Toggle italic" onClick={() => editor.chain().focus().toggleItalic().run()}>
                        <Italic className="h-4 w-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem value="underline" aria-label="Toggle strikethrough" onClick={() => editor.chain().focus().toggleUnderline().run()}>
                        <UnderlineIcon className="h-4 w-4" />
                    </ToggleGroupItem>
                </ToggleGroup>

                <button
                    onClick={() => editor.chain().focus().toggleBulletList().run()}
                    className="p-2 rounded"
                >
                    • List
                </button>
                <button
                    onClick={() => editor.chain().focus().toggleOrderedList().run()}
                    className="p-2 rounded"
                >
                    1. List
                </button>
            </div>
            <EditorContent editor={editor} className="border p-2 min-h-[200px]" />
        </div>
    )
}