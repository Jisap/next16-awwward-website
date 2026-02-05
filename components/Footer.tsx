import React from "react";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white h-[70vh] fixed bottom-0 w-full">
      <div className="container py-8 flex flex-wrap flex-col justify-center min-h-full">
        {/* footer list */}
        <div className="flex flex-wrap flex-col md:flex-row md:items-center gap-7 sm:gap-14 lg:gap-20">
          {/* parte izda  */}
          <div>
            <div className="flex gap-2 mb-3 sm:gap-5">
              <div className="grid gap-1">
                {["home", "work", "contact"].map((label) => (
                  <a href="#" className="uppercase hover:underline" key={label}>{label}</a>
                ))}
              </div>

              <div className="grid gap-1">
                {["instagram", "linkedin", "awwwards"].map((label) => (
                  <a href="#" className="uppercase hover:underline" key={label}>{label}</a>
                ))}
              </div>
            </div>

            <p className="max-w-xs text-sm opacity-80 mb-3">
              We design and build thoughtful digital experiences focused on clarity, performance, and long-term impact.
            </p>

            <p>
              &copy; Kane & Finch {new Date().getFullYear()} All rights reserved.
            </p>
          </div>

          {/* parte derecha */}
          <div className="flex-1">
            <h3 className="text-4xl font-medium uppercase md:text-6xl lg:text-7xl xl:text-8xl">
              Let's chat
            </h3>

            <p className="max-w-md mt-2 opacity-80">
              Have a project in mind, a question, or just want to say hello? we're always open to meaningful conversations.
            </p>

            <p>
              Privacy policy
            </p>

            <div className="mt-4 text-sm">
              <p>
                Email:{" "}<a href="#" className="hover:underline"> hello@Novak.com</a>
              </p>

              <p>
                Based worldwide - Working remotely
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
