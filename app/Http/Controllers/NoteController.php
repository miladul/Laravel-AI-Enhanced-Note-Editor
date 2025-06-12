<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Inertia\Inertia;

class NoteController extends Controller
{
    // Display a listing of the resource.
    public function index()
    {
        $notes = Note::latest()->paginate(5); // 5 per page
        return response()->json($notes);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'content' => 'nullable|string',
        ]);

        $validated['user_id'] = auth()->user()->id;

        $note = Note::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Note updated successfully.',
            'note' => [],
        ]);

        return response()->json(['message' => 'Note created successfully!']);
    }

    public function view(Note $note)
    {
        //return Inertia::render('Note/Show', ['note' => $note]);

        return Inertia::render('Note/ViewNote', [
            'note' => $note,
        ]);
    }

    public function show(Note $note)
    {
        return Inertia::render('Note/Show', ['note' => $note]);
    }

    public function edit(Note $note)
    {
        return Inertia::render('Note/Edit', ['note' => $note]);
    }

    public function update(Request $request, Note $note)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'content' => 'nullable|string',
        ]);

        $note->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Note updated successfully.',
            'note' => $note,
        ]);
    }


    public function destroy(Note $note)
    {
        $note->delete();

        return response()->json([
            'success' => true,
            'message' => 'Note updated successfully.',
            'note' => [],
        ]);

        //return redirect()->back()->with('message', 'Note deleted!');
    }

}

