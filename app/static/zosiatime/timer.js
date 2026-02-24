const CLOCK_REFRESH_INTERVAL_MS = 100;
const SCHEDULE_REFRESH_INTERVAL_MS = 60000;
const MAX_EVENT_DISTANCE_SECONDS = 6 * 60 * 60;

let scheduleData = { events: [] };

function setBarColor(color) {
    const bar = document.getElementById("bar");
    bar.classList.remove("green", "red", "yellow", "orange");
    bar.classList.add(color === "white" ? "green" : color);
}

function sanitizeEvent(event) {
    const start = Number(event.start);
    const end = Number(event.end);
    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
        return null;
    }

    return {
        start,
        end,
        title: String(event.title ?? "Untitled"),
        author: String(event.author ?? "N/A"),
    };
}

function normalizeScheduleData(payload) {
    if (!payload || !Array.isArray(payload.events)) {
        return [];
    }

    return payload.events
        .map(sanitizeEvent)
        .filter((event) => event)
        .sort((left, right) => left.start - right.start);
}

function formatDuration(durationSeconds) {
    const totalSeconds = Math.max(0, Math.floor(durationSeconds));
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const pad = (num) => String(num).padStart(2, "0");

    if (hours > 0) {
        return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
    }

    return `${pad(minutes)}:${pad(seconds)}`;
}

function findEvents(nowSeconds) {
    let eventNow;
    let eventPrevious;
    let eventNext;

    for (const event of scheduleData.events) {
        if (event.start <= nowSeconds && event.end > nowSeconds) {
            eventNow = event;
        } else if (event.start <= nowSeconds && (!eventPrevious || eventPrevious.start <= event.start)) {
            eventPrevious = event;
        } else if (event.start > nowSeconds && (!eventNext || event.start <= eventNext.start)) {
            eventNext = event;
        }
    }

    if (eventNext && eventNext.start - nowSeconds > MAX_EVENT_DISTANCE_SECONDS) {
        eventNext = undefined;
    }
    if (eventPrevious && nowSeconds - eventPrevious.end > MAX_EVENT_DISTANCE_SECONDS) {
        eventPrevious = undefined;
    }

    return [eventPrevious, eventNow, eventNext];
}

function refreshClock() {
    const nowMs = Date.now();
    const nowSeconds = nowMs / 1000;

    const [previousEvent, currentEvent, nextEvent] = findEvents(nowSeconds);

    if (currentEvent) {
        document.getElementById("timer-break").style.display = "none";
        document.getElementById("timer-event").style.display = "inherit";

        const secondsToEnd = currentEvent.end - nowSeconds;
        document.getElementById("timer-event").innerText = formatDuration(secondsToEnd);

        const eventDurationMs = (currentEvent.end - currentEvent.start) * 1000;
        const elapsedMs = nowMs - currentEvent.start * 1000;
        const progress = Math.max(0, Math.min(1, elapsedMs / eventDurationMs));
        document.getElementById("bar").value = progress;

        let color = "white";
        if (secondsToEnd < 60) {
            color = "red";
        } else if (secondsToEnd < 5 * 60) {
            color = "orange";
        } else if (secondsToEnd < 10 * 60) {
            color = "yellow";
        }

        document.getElementById("timer-event").style.color = color;
        setBarColor(color);
        document.getElementById("footer").innerText = `ZOSIA - ${currentEvent.title} - ${currentEvent.author}`;
        return;
    }

    document.getElementById("timer-break").style.display = "inherit";
    document.getElementById("timer-event").style.display = "none";

    const secondsFromPrevious = previousEvent ? nowSeconds - previousEvent.end : null;
    const secondsToNext = nextEvent ? nextEvent.start - nowSeconds : null;

    document.getElementById("timer-break-up").innerText = secondsFromPrevious !== null
        ? `-${formatDuration(secondsFromPrevious)}`
        : "N/A";
    document.getElementById("timer-break-down-text").innerText = secondsToNext !== null
        ? formatDuration(secondsToNext)
        : "END";

    let progress = 1;
    if (previousEvent && nextEvent) {
        const breakDurationMs = (nextEvent.start - previousEvent.end) * 1000;
        const elapsedMs = nowMs - previousEvent.end * 1000;
        progress = Math.max(0, Math.min(1, elapsedMs / breakDurationMs));
    } else if (!previousEvent && nextEvent) {
        progress = 0;
    }
    document.getElementById("bar").value = progress;

    let color = "white";
    if (secondsToNext !== null && secondsToNext < 60) {
        color = "orange";
    } else if (secondsToNext !== null && secondsToNext < 3 * 60) {
        color = "yellow";
    }

    document.getElementById("timer-break-down").style.color = color;
    setBarColor(color);

    if (nextEvent) {
        document.getElementById("footer").innerText = `~BREAK~ Next: ${nextEvent.title} - ${nextEvent.author}`;
    } else if (scheduleData.events.length > 0) {
        document.getElementById("footer").innerText = "~BREAK~ Day finished";
    } else {
        document.getElementById("footer").innerText = "Waiting for schedule data...";
    }
}

async function refreshScheduleData() {
    const dataUrl = document.body.dataset.timerDataUrl;
    if (!dataUrl) {
        return;
    }

    try {
        const response = await fetch(`${dataUrl}?_=${Date.now()}`, { cache: "no-store" });
        if (!response.ok) {
            return;
        }

        const payload = await response.json();
        const events = normalizeScheduleData(payload);

        scheduleData = { events };
        refreshClock();
    } catch (error) {
        console.error("Failed to refresh schedule data", error);
    }
}

function init() {
    window.setInterval(refreshClock, CLOCK_REFRESH_INTERVAL_MS);
    refreshScheduleData();
    window.setInterval(refreshScheduleData, SCHEDULE_REFRESH_INTERVAL_MS);
}

window.addEventListener("DOMContentLoaded", init, false);
