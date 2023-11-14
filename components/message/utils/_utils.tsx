import React, { ReactNode } from "react";
import Link from "next/link";
import reactStringReplace from "react-string-replace";
import { IOrbisPostContent } from "../DirectMessages/_types";

/** Regex patterns to use */
const patternMentions = /\B@[a-z0-9_.⍙-]+/gi;

export function didToAddress(did: string) {
  if (!did) return;

  const _did = did.split(":");
  return _did[4];
}

export function formatMessage(
  content: IOrbisPostContent,
  hideOverflow = false
): ReactNode {
  if (!content || !content.body) return null;

  let { body }: { body: any } = content;

  if (hideOverflow && body.length > 285) {
    body = body.substring(0, 280);
    return body + "...";
  }

  /** Replace all <br> generated by the postbox to \n to handle line breaks */
  body = reactStringReplace(body, "<br>", function (match, i) {
    return <br key={match + i} />;
  });

  body = reactStringReplace(body, "\n", function (match, i) {
    return <br key={match + i} />;
  });

  /** Replace URLs */
  body = reactStringReplace(
    body,
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/g,
    function (match, i) {
      const shortUrl =
        match.substring(0, 25) +
        "..." +
        match.substring(match.length - 15, match.length);
      return (
        <a
          key={match + i}
          href={match}
          rel="noreferrer"
          target="_blank"
          title={match}
        >
          {match.length > 40 ? shortUrl : match}
        </a>
      );
    }
  );

  /** Identify and replace mentions */

  /** Get mentions in post metadata */
  const { mentions } = content;

  /** Retrieve mentions in the body */
  const mentionsInBody = content.body.toString().match(patternMentions);

  /** Compare both and replace in body */
  if (mentionsInBody && mentions && Array.isArray(mentions)) {
    mentionsInBody.forEach((_m) => {
      /** Find mention with the same name */
      const mention = mentions.find((obj) => obj.username === _m);
      if (mention !== undefined) {
        body = reactStringReplace(body, _m, (match, i) =>
          mention.did ? (
            <Link
              href={`/profile/${didToAddress(mention.did)}`}
              key={match + i}
            >
              {mention.username}
            </Link>
          ) : (
            <span className="link" key={i}>
              {mention.username}
            </span>
          )
        );
      }
    });
  }

  return body;
}

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
