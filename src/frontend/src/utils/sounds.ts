/**
 * Minecraft-style purchase sound using the Web Audio API.
 * No external files required — synthesized entirely in-browser.
 */

export function playPurchaseSound(): void {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtx) return;

    const ctx = new AudioCtx();

    // Ascending arpeggio: C5 → E5 → G5 → C6
    const notes = [523.25, 659.25, 783.99, 1046.5];
    const noteSpacing = 0.1; // seconds between note onsets
    const noteDuration = 0.18; // seconds each note sounds

    notes.forEach((freq, i) => {
      const startTime = ctx.currentTime + i * noteSpacing;

      // Sine oscillator for the main tone
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(freq, startTime);

      // Slight triangle harmonic for brightness
      const osc2 = ctx.createOscillator();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(freq * 2, startTime);

      // Gain envelope — fast attack, exponential decay
      const gainNode = ctx.createGain();
      gainNode.gain.setValueAtTime(0, startTime);
      gainNode.gain.linearRampToValueAtTime(0.35, startTime + 0.012);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + noteDuration,
      );

      const gainNode2 = ctx.createGain();
      gainNode2.gain.setValueAtTime(0, startTime);
      gainNode2.gain.linearRampToValueAtTime(0.08, startTime + 0.012);
      gainNode2.gain.exponentialRampToValueAtTime(
        0.001,
        startTime + noteDuration,
      );

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);

      osc2.connect(gainNode2);
      gainNode2.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + noteDuration);

      osc2.start(startTime);
      osc2.stop(startTime + noteDuration);
    });

    // Close the context shortly after all notes have finished
    const totalDuration = notes.length * noteSpacing + noteDuration + 0.1;
    setTimeout(() => {
      ctx.close().catch(() => {});
    }, totalDuration * 1000);
  } catch {
    // Silently swallow any audio errors (blocked autoplay policy, etc.)
  }
}
