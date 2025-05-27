export async function* getGentxttoimgStream(
  model: string,
  prompt: string
): AsyncIterable<any> {
  if (!prompt) {
    return;
  }

  const response = await fetch(
    `/api/gen/txttoimg?model=${model}&prompt=${encodeURIComponent(prompt)}`
  );

  if (!response.ok) {
    let errorData = { error: `HTTP error! status: ${response.status}` };
    try {
      const text = await response.text();
      errorData = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse error JSON:", e);
    }
    throw new Error(
      (errorData as any).message ||
        errorData.error ||
        `HTTP error! status: ${response.status}`
    );
  }

  if (!response.body) {
    throw new Error("Response body is null");
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) {
        break;
      }

      buffer += decoder.decode(value, { stream: true });

      let eolIndex = buffer.indexOf("\n");
      while (eolIndex !== -1) {
        const line = buffer.substring(0, eolIndex);
        buffer = buffer.substring(eolIndex + 1);
        if (line.trim().length > 0) {
          try {
            yield JSON.parse(line.trim());
          } catch (e) {
            console.error("Failed to parse JSON line:", line, e);
          }
        }
        eolIndex = buffer.indexOf("\n");
      }
    }
    if (buffer.trim().length > 0) {
      try {
        yield JSON.parse(buffer.trim());
      } catch (e) {
        console.error(
          "Failed to parse JSON line (remaining buffer):",
          buffer,
          e
        );
      }
    }
  } finally {
    reader.releaseLock();
  }
}
